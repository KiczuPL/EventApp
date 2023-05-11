import {Button, Modal, Portal, Text} from 'react-native-paper';
import MapLibreGL from '@maplibre/maplibre-react-native';

import * as config from '../../config/config';
import {StyleSheet, View} from 'react-native';
import {useCallback, useState} from 'react';
import {Coordinates} from '../organisms/CreateEvent';

MapLibreGL.setAccessToken(null);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

type placePickerProps = {
  visible: boolean;
  toggle: () => void;
  setTargetCoordinates: (coordinates: Coordinates) => void;
};

export default ({visible, toggle, setTargetCoordinates}: placePickerProps) => {
  const [coordinates, setCoordinates] = useState<number[]>([
    2.3210938, 48.8565913,
  ]);

  const handleClick = useCallback(
    (cords: number[]) => {
      console.log(cords);
      setCoordinates(cords);
      setTargetCoordinates({
        latitude: cords[0],
        longitude: cords[1],
      });
    },
    [setCoordinates],
  );

  const handleSubmit = useCallback(() => {
    toggle();
  }, [setTargetCoordinates, toggle]);

  if (!visible) return null;
  return (
    <Portal>
      <MapLibreGL.MapView
        style={styles.map}
        logoEnabled={false}
        attributionEnabled={true}
        attributionPosition={{bottom: 8, left: 8}}
        styleURL={config.styleurl}
        onPress={feature => {
          console.log('Coords:', feature.geometry.coordinates);
          setCoordinates(feature.geometry.coordinates);
          handleClick(feature.geometry.coordinates);
        }}>
        <MapLibreGL.Camera
          defaultSettings={{
            centerCoordinate: [2.3210938, 48.8565913],
            zoomLevel: 5,
          }}
        />
        <MapLibreGL.ShapeSource
          id={'marker-source'}
          shape={{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coordinates,
            },
          }}>
          <MapLibreGL.SymbolLayer
            id={'marker'}
            style={{
              iconImage:
                'https://www.jawg.io/docs/images/icons/eiffel-tower.png',
              iconSize: 0.5,
            }}
          />
        </MapLibreGL.ShapeSource>
      </MapLibreGL.MapView>
      <Portal>
        <View
          style={{
            marginTop: 'auto',
            marginBottom: 40,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Button
            style={{backgroundColor: 'dimgray'}}
            mode="contained"
            onPress={handleSubmit}>
            Pick place
          </Button>
        </View>
      </Portal>
    </Portal>
  );
};
