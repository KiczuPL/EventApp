import React, {useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from '../features/events/screens/MapScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth0} from 'react-native-auth0';
import {ActivityIndicator, Text, useTheme} from 'react-native-paper';
import {firstLogin} from '../features/auth/api/loginRequest';
import {View} from 'react-native';
import EventList from '../features/events/ui/EventList';
import {createStackNavigator} from '@react-navigation/stack';
import ChatListScreen from '../screens/ChatListScreen';
import ChatScreen from '../features/chats/screens/ChatScreen';
import {RouteProp} from '@react-navigation/native';

export type ChatStackParamList = {
  ChatList: undefined;
  Chat: {chatId: number; chatTitle: string};
};

export type ChatStackRouteProps<RouteName extends keyof ChatStackParamList> =
  RouteProp<ChatStackParamList, RouteName>;

export default () => {
  const {user, isLoading, getCredentials} = useAuth0();
  const Tab = createMaterialBottomTabNavigator();
  const EventStack = createStackNavigator();
  const ChatStack = createStackNavigator<ChatStackParamList>();
  const theme = useTheme();
  const getAccessToken = async () => {
    const credentials = await getCredentials();
    return credentials.accessToken;
  };
  const fetchUser = async () => {
    const token = await getAccessToken();
    await firstLogin(token, user.sub?.slice(6), user.nickname);
  };

  useEffect(() => {
    if (user && !isLoading) {
      fetchUser();
    }
  }, [user]);
  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : user ? (
        <Tab.Navigator
          initialRouteName="Home"
          shifting={true}
          sceneAnimationEnabled={true}
          sceneAnimationType="shifting">
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
              tabBarIcon: ({color}) => <Icon name="map" size={30} />,
            }}
          />
          <Tab.Screen
            name="Home"
            options={{
              tabBarIcon: ({color}) => <Icon name="home" size={30} />,
            }}>
            {() => (
              <EventStack.Navigator initialRouteName="Dashboard">
                <EventStack.Screen
                  options={{headerShown: false}}
                  name="Dashboard"
                  initialParams={{chatId: 1}}
                  component={HomeScreen}
                />
                <EventStack.Screen
                  options={{title: 'Your Events'}}
                  name="EventList"
                  component={EventList}
                />
              </EventStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Chats"
            options={{
              tabBarIcon: ({color}) => <Icon name="chat" size={30} />,
            }}>
            {() => (
              <ChatStack.Navigator initialRouteName="ChatList">
                <ChatStack.Screen
                  name="ChatList"
                  options={{title: 'Your Chats'}}
                  component={ChatListScreen}
                />
                <ChatStack.Screen
                  name="Chat"
                  options={{title: 'Chat'}}
                  component={ChatScreen}
                />
              </ChatStack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <LoginScreen />
      )}
    </>
  );
};
