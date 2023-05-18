import React, {Component, useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';

import * as config from '../../config/config';

import EventDetailsDialog from './EventDetailsDialog';
import {getEventsGeoJson} from '../../features/events/api/getEventsGeoJson';
import axios from 'axios';
import {BACKEND_EVENT_API_URL} from '../../features/events/api/constants';
import {Button, Portal} from 'react-native-paper';

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

export interface EventMapGeoJson {
  type: string;
  features: SingleEventMapGeoJson[];
}

export interface SingleEventMapGeoJson {
  type: string;
  geometry: {};
  properties: MarkerProperties;
}

interface MarkerProperties {
  icon: string;
  id: number;
}

export default () => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [geoJson, setGeoJson] = useState<EventMapGeoJson>();
  const [selectedEventMarker, setSelectedEventMarker] = useState<
    SingleEventMapGeoJson | undefined
  >(undefined);
  const toggleDialog = () => setVisible(!visible);

  const handleMarkerPress = (marker: SingleEventMapGeoJson) => {
    setSelectedEventMarker(marker);
    toggleDialog();
  };

  useEffect(() => {
    if (isLoading) {
      console.log('CALL for geojson');

      fetch(BACKEND_EVENT_API_URL + 'event/geoJson')
        .then(response => response.json())
        .then(responseJson => {
          console.log('AAAPI response: ' + JSON.stringify(responseJson));
          setGeoJson(responseJson);
        });
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapLibreGL.MapView
          style={styles.map}
          logoEnabled={false}
          attributionEnabled={true}
          attributionPosition={{bottom: 8, left: 8}}
          styleURL={config.styleurl}>
          <MapLibreGL.Camera
            defaultSettings={{
              centerCoordinate: [21.017532, 52.237049],
              zoomLevel: 5,
            }}
          />
          {geoJson?.features?.map((marker, index) => {
            // console.log(
            //   BACKEND_EVENT_API_URL + 'event/' + marker.properties.id + '/icon',
            // );
            return (
              <MapLibreGL.ShapeSource
                id={'marker-source-' + index}
                onPress={() => handleMarkerPress(marker)}
                cluster={true}
                shape={{
                  type: 'Feature',
                  geometry: marker.geometry,
                }}>
                <MapLibreGL.SymbolLayer
                  id={'marker' + index}
                  style={{
                    iconImage:
                      BACKEND_EVENT_API_URL +
                      'event/' +
                      marker.properties.id +
                      '/icon',
                    iconSize: 0.25,
                  }}
                />
              </MapLibreGL.ShapeSource>
            );
          })}
        </MapLibreGL.MapView>
        <Portal>
          <View
            style={{
              marginTop: 'auto',
              marginBottom: 100,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Button
              style={{backgroundColor: 'dimgray'}}
              mode="contained"
              onPress={() => setIsLoading(true)}>
              Refresh
            </Button>
          </View>
        </Portal>

        <EventDetailsDialog
          visible={visible}
          toggleDialog={toggleDialog}
          event={selectedEventMarker}
        />
      </View>
    </View>
  );
};
