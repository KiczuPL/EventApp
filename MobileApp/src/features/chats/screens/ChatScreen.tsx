import {useEffect, useState, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {getMessages} from '../api/getMessages';
import {useAuth0} from 'react-native-auth0';
import SockJS from 'sockjs-client';
import {CompatClient, Stomp} from '@stomp/stompjs';
import {useRoute} from '@react-navigation/native';
import {
  ChatStackParamList,
  ChatStackRouteProps,
} from '../../../navigation/NavigationScreens';
import {RouteProp} from '@react-navigation/native';
import {CHAT_WEBSOCKET_URL} from '../api/constantns';

export default () => {
  const route = useRoute<RouteProp<ChatStackParamList, 'Chat'>>();
  //console.log(JSON.stringify(route));
  const chatId = route.params.chatId;
  const chatTitle = route.params.chatTitle;
  const [numberOfMessages, setNumberOfMessages] = useState(0);
  const {user, getCredentials} = useAuth0();
  const [chunkSize, setChunkSize] = useState(10);
  const [socket, setSocket] = useState(null);
  const [stompClient, setStompClient] = useState<CompatClient | undefined>(
    undefined,
  );

  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  const getAccessToken = async () => {
    const credentials = await getCredentials();
    return credentials.accessToken;
  };

  const fetchMessages = useCallback(async () => {
    const token = await getAccessToken();
    const messageChunk = await getMessages(
      token,
      chatId,
      messages.length,
      chunkSize,
    );
    if (messageChunk) {
      const mappedChunk = messageChunk.lines.map(message => {
        return {
          _id: message.id,
          text: message.message,
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.sender.id,
            name: message.sender.name,
          },
        };
      });
      setMessages(GiftedChat.append(mappedChunk, messages));
      console.log(messages);
    }
  }, [chatId, messages, chunkSize]);

  const fetchMoreMessages = useCallback(async () => {
    await fetchMessages();
  }, [fetchMessages, messages]);

  useEffect(() => {
    navigation.setOptions({title: chatTitle});
    console.log('konfiguracja websocket');
    const socket = new SockJS(CHAT_WEBSOCKET_URL);
    const stomp = Stomp.over(() => socket);
    stomp.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      stomp.subscribe(`/topic/chat/${chatId}`, function (newMessage) {
        console.log('socket response!!!');
        const rawMessage = JSON.parse(newMessage.body);
        const message = {
          _id: rawMessage.id,
          text: rawMessage.message,
          createdAt: new Date(rawMessage.createdAt),
          user: {
            _id: rawMessage.sender.id,
            name: rawMessage.sender.name,
          },
        };
        if (message)
          setMessages(messages => GiftedChat.append(messages, [message]));
        //setMessages([...messages, message]);
      });
    });
    setStompClient(stomp);
  }, []);

  const sendMessage = useCallback(
    async newMessage => {
      console.log('send leci' + JSON.stringify(newMessage));
      const message = {
        senderId: user.sub.slice(6),
        content: newMessage[0].text,
      };
      stompClient?.send(
        `/app/chat/${chatId}/sendMessage`,
        {},
        JSON.stringify(message),
      );
    },
    [stompClient],
  );

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <GiftedChat
      messages={messages}
      user={{_id: user?.sub.slice(6)}}
      scrollToBottom
      onSend={newMessages => {
        sendMessage(newMessages);
        //setMessages(GiftedChat.append(messages, newMessages));
        //setMessages(messages => GiftedChat.append(messages, newMessages));
      }}
      infiniteScroll
      onLoadEarlier={fetchMoreMessages}
      loadEarlier={true}
    />
  );
};
