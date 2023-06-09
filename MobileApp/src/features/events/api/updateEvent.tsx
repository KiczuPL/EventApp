import axios from 'axios';
import {BACKEND_EVENT_PRIVATE_API_URL} from './constants';

export const updateEvent = async (
  token: string,
  eventId: number,
  ownerId: string,
  title: string,
  description: string,
  startDateTime: Date,
  timeZone: string,
  latitude: number,
  longitude: number,
  iconFilename: string,
  maxParticipants: number,
) => {
  // console.log(
  //   'send: ' +
  //     JSON.stringify({
  //       ownerId: ownerId,
  //       title: title,
  //       description: description,
  //       startDatetime: startDateTime,
  //       timeZoneId: timeZone,
  //       longitude: longitude,
  //       latitude: latitude,
  //       iconFilename: iconFilename,
  //       maxParticipants: maxParticipants,
  //     }),
  // );
  return axios
    .put(
      BACKEND_EVENT_PRIVATE_API_URL + 'event/update',
      {
        id: eventId,
        ownerId: ownerId,
        title: title,
        description: description,
        startDatetime: startDateTime,
        timeZoneId: timeZone,
        longitude: longitude,
        latitude: latitude,
        iconFilename: iconFilename,
        maxParticipants: maxParticipants,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
    .then(response => response.data)
    .then(responseJson => {
      console.log(
        'Successfully created event: ' + JSON.stringify(responseJson),
      );
      return responseJson;
    });
};
