import React, {Component, useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';

import * as config from '../../../config/config';

import EventDetailsDialog from './EventDetailsDialog';
import {getEventsGeoJson} from '../api/getEventsGeoJson';
import {BACKEND_EVENT_PUBLIC_API_URL} from '../api/constants';
import {Button, Portal, useTheme} from 'react-native-paper';
import {useAuth0} from 'react-native-auth0';
import {useNavigation} from '@react-navigation/native';

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
  const [refreshButtonVisible, setRefreshButtonVisible] =
    useState<boolean>(false);

  const navigation = useNavigation();
  const {getCredentials} = useAuth0();
  const theme = useTheme();

  const toggleDialog = () => setVisible(!visible);

  const handleMarkerPress = (marker: SingleEventMapGeoJson) => {
    setSelectedEventMarker(marker);
    toggleDialog();
  };

  const getAccessToken = async () => {
    const credentials = await getCredentials();
    return credentials.accessToken;
  };

  useEffect(() => {
    const showRefreshButton = navigation.addListener('focus', () => {
      setRefreshButtonVisible(true);
    });
    const hideRefreshButton = navigation.addListener('blur', () => {
      setRefreshButtonVisible(false);
    });
  }),
    [];

  useEffect(() => {
    (async () => {
      if (isLoading) {
        const accessToken = await getAccessToken();
        const eventsGeoJson = await getEventsGeoJson(accessToken);
        setGeoJson(eventsGeoJson);

        setIsLoading(false);
      }
    })();
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
            //   BACKEND_EVENT_PUBLIC_API_URL + 'icon/' + marker.properties.icon,
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
                  id={'marker-' + index}
                  style={{
                    iconImage:
                      BACKEND_EVENT_PUBLIC_API_URL +
                      'icon/' +
                      marker.properties.icon,
                    iconSize: 0.25,
                    iconAllowOverlap: true,
                  }}
                />
              </MapLibreGL.ShapeSource>
            );
          })}
        </MapLibreGL.MapView>
        {refreshButtonVisible && (
          <Portal>
            <View
              style={{
                marginTop: 'auto',
                marginBottom: 100,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Button
                style={{backgroundColor: theme.colors.secondary}}
                mode="contained"
                onPress={() => setIsLoading(true)}>
                Refresh
              </Button>
            </View>
          </Portal>
        )}

        <EventDetailsDialog
          visible={visible}
          toggleDialog={toggleDialog}
          event={selectedEventMarker}
        />
      </View>
    </View>
  );
};
