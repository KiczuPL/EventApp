import axios from 'axios';
import {BACKEND_EVENT_PRIVATE_API_URL} from './constants';
import {SingleEventMapGeoJson} from '../ui/EventMap';
import {EventDetails} from '../ui/MapEventDetailsDialog';

export type GetEventDetails = (
  token: string,
  eventId: number,
) => Promise<EventDetails>;

export const getEventDetails: GetEventDetails = async (
  token: string,
  eventId: number,
) => {
  console.log('CALL for event details');
  return axios
    .get<EventDetails>(BACKEND_EVENT_PRIVATE_API_URL + 'event/' + eventId, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then(response => response.data)
    .then(responseJson => {
      console.log('Got event details: ' + JSON.stringify(responseJson));
      return responseJson;
    });
};
