import axios from 'axios';
import {BACKEND_EVENT_API_URL} from './constants';

export type EventDetails = {};

export const getEventDetails = async () => {
  axios.get(BACKEND_EVENT_API_URL + 'event').then(response => {
    console.log(response.data);
    return response.data;
  });
};
