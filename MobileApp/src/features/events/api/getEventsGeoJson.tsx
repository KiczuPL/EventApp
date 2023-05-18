import axios from 'axios';
import {BACKEND_EVENT_API_URL} from './constants';
import {EventMapGeoJson} from '../../../components/organisms/EventMap';

type GetEventsGeoJson = () => Promise<EventMapGeoJson>;

export const getEventsGeoJson: GetEventsGeoJson = async () => {};
