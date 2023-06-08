import axios from 'axios';
import {BACKEND_EVENT_PRIVATE_API_URL} from './constants';

export const cancelEvent = async (token: string, eventId: number) => {
  console.log(BACKEND_EVENT_PRIVATE_API_URL + 'event/' + eventId);

  return axios.delete(BACKEND_EVENT_PRIVATE_API_URL + 'event/' + eventId, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
