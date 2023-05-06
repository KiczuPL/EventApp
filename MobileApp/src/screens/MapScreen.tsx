import React, {Component, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';

import * as config from '../config/config';

import {Avatar, Button, Dialog, Icon} from '@rneui/themed';
import EventMap from '../components/organisms/EventMap';

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
