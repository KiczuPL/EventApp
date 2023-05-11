import React, {Component, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';

import * as config from '../../config/config';

import EventDetailsDialog from './EventDetailsDialog';

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
  geometry: {};
  properties: MarkerProperties;
}

interface MarkerProperties {
  icon: string;
  id: number;
}

export default () => {
  const [visible, setVisible] = useState(false);
  const [geoJson, setGeoJson] = useState<EventMapGeoJson[]>([]);
  const [selectedEventMarker, setSelectedEventMarker] =
    useState<EventMapGeoJson>({
      type: 's',
      geometry: {type: 'Point', coordinates: [2.294694, 47.858093]},
      properties: {icon: 'a', id: 0},
    });
  const toggleDialog = () => setVisible(!visible);

  const handleMarkerPress = (marker: EventMapGeoJson) => {
    setSelectedEventMarker(marker);
    toggleDialog();
  };

  useEffect(() => {
    //console.log(MapMarkers.features);
    const markers: EventMapGeoJson[] = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2.294694, 47.858093],
        },
        properties: {
          icon: 'https://www.jawg.io/docs/images/icons/big-ben.png',
          id: 1,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [3.294694, 47.858093],
        },
        properties: {
          icon: 'https://www.jawg.io/docs/images/icons/big-ben.png',
          id: 2,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [4.294694, 47.858093],
        },
        properties: {
          icon: 'https://www.jawg.io/docs/images/icons/eiffel-tower.png',
          id: 3,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2.294694, 48.858093],
        },
        properties: {
          icon: 'https://www.jawg.io/docs/images/icons/eiffel-tower.png',
          id: 4,
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2.294694, 49.858093],
        },
        properties: {
          icon: 'https://www.jawg.io/docs/images/icons/big-ben.png',
          id: 5,
        },
      },
    ];

    setGeoJson(markers);
    console.log({
      type: 'FeatureCollection',
      features: geoJson,
    });
  }, []);

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
              centerCoordinate: [2.3210938, 48.8565913],
              zoomLevel: 5,
            }}
          />
          {geoJson.map((marker, index) => {
            console.log(marker.properties.icon);
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
                    iconImage: marker.properties.icon,
                    iconSize: 0.5,
                  }}></MapLibreGL.SymbolLayer>
              </MapLibreGL.ShapeSource>
            );
          })}
        </MapLibreGL.MapView>

        <EventDetailsDialog
          visible={visible}
          toggleDialog={toggleDialog}
          event={selectedEventMarker}
        />
      </View>
    </View>
  );
};
