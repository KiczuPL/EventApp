import axios from 'axios';
import {BACKEND_EVENT_PRIVATE_API_URL} from './constants';
import {EventMapGeoJson} from '../ui/EventMap';

type GetEventsGeoJson = (token: string) => Promise<EventMapGeoJson>;

export const getEventsGeoJson: GetEventsGeoJson = async (token: string) => {
  console.log('CALL for geojson');
  return axios
    .get<EventMapGeoJson>(BACKEND_EVENT_PRIVATE_API_URL + 'event/geoJson', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then(response => response.data)
    .then(response => {
      console.log('AAAPI response: ' + JSON.stringify(response));
      return response;
    });
};
