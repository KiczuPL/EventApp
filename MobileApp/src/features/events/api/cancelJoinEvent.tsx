import axios from 'axios';
import {BACKEND_EVENT_PRIVATE_API_URL} from './constants';

export const cancelJoinEvent = async (
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
      '/join/cancel?participantId=' +
      participantId,
  );
  return axios
    .post(
      BACKEND_EVENT_PRIVATE_API_URL +
        'event/' +
        eventId +
        '/join/cancel?participantId=' +
        participantId,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
    .then(response => response.data)
    .then(responseJson => {
      return responseJson;
    });
};
