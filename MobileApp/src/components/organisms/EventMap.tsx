import React, {Component, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';

import * as config from '../../config/config';

import {Avatar, Badge, Button, Dialog} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

interface EventMapGeoJson {
  type: string;
  geometry: {};
  properties: MarkerProperties;
}

interface MarkerProperties {
  icon: string;
}

export default () => {
  const [visible, setVisible] = useState(false);
  const [geoJson, setGeoJson] = useState<EventMapGeoJson[]>([]);
  const toggleDialog = () => setVisible(!visible);

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
                onPress={toggleDialog}
                cluster={false}
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

        <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
          <Dialog.Title title="Dialog Title" />
          <Text>Dialog body text. Add relevant information here.</Text>
          <Dialog.Actions>
            <Dialog.Button
              title="ACTION 1"
              onPress={() => console.log('Primary Action Clicked!')}
            />
            <Dialog.Button
              title="ACTION 2"
              onPress={() => console.log('Secondary Action Clicked!')}
            />
          </Dialog.Actions>
        </Dialog>
      </View>
    </View>
  );
};
