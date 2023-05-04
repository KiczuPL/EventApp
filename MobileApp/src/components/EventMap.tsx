import React, {Component, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';

import * as config from '../config/config';

import {Avatar, Button, Dialog, Icon} from '@rneui/themed';

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
  const [visible, setVisible] = useState(false);
  const toggleDialog = () => setVisible(!visible);

  return (
    <View style={styles.page}>
      <Text>DUPA</Text>
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
          <MapLibreGL.PointAnnotation
            id="aawrfaf"
            coordinate={[-1.124589, 51.500741]}
            onSelected={toggleDialog}
          />

          <MapLibreGL.ShapeSource
            id="marker-source"
            onPress={toggleDialog}
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [2.294694, 48.858093],
              },
            }}>
            <MapLibreGL.SymbolLayer
              id="marker-layer"
              style={{
                iconImage:
                  'https://www.jawg.io/docs/images/icons/eiffel-tower.png',
                iconSize: 0.5,
              }}
            />
          </MapLibreGL.ShapeSource>
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
