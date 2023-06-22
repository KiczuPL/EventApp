import axios from 'axios';
import {BACKEND_CHAT_PRIVATE_API_URL} from './constantns';

export const getMessages = async (
  token: string,
  chatId: number,
  offset: number,
  size: number,
) => {
  //   console.log(token, chatId, offset, size);
  //   console.log(
  //     BACKEND_CHAT_PRIVATE_API_URL +
  //       `chat/${chatId}/messages?offset=${offset}&size=${size}`,
  //   );
  return axios
    .get(
      BACKEND_CHAT_PRIVATE_API_URL +
        `chat/${chatId}/messages?offset=${offset}&size=${size}`,
      {headers: {Authorization: `Bearer ${token}`}},
    )
    .then(res => res.data)
    .then(data => {
      //console.log(`Received messages ${JSON.stringify(data)}`);
      return data;
    });
};
