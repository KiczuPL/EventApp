import axios from 'axios';
import {BACKEND_EVENT_PRIVATE_API_URL} from './constants';

export default async (token: string, userId: string) => {
  return axios
    .get(BACKEND_EVENT_PRIVATE_API_URL + 'user/' + userId + '/events', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then(response => response.data)
    .then(response => {
      //console.log(`Got event of user ${userId}: ${JSON.stringify(response)}`);
      return response;
    });
};
