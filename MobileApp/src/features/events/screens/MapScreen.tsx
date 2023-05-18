import MapLibreGL from '@maplibre/maplibre-react-native';
import React from 'react';
import {StyleSheet} from 'react-native';

import EventMap from '../../../components/organisms/EventMap';

MapLibreGL.setAccessToken(null);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
});

export default () => {
  return <EventMap />;
};
