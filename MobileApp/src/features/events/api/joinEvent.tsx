import axios from 'axios';
import {BACKEND_EVENT_PRIVATE_API_URL} from './constants';

export const joinEvent = async (
  token: string,
  participantId: string,
  eventId: number,
) => {
  console.log(token);
  console.log(participantId);
  console.log(eventId);
  console.log(
    BACKEND_EVENT_PRIVATE_API_URL +
      'event/' +
      eventId +
      '/join?participantId=' +
      participantId,
  );
  console.log('XYZ');
  return axios.post(
    BACKEND_EVENT_PRIVATE_API_URL +
      'event/' +
      eventId +
      '/join?participantId=' +
      participantId,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
};
