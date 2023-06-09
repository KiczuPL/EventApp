import {Button, Modal, Portal, Text, useTheme} from 'react-native-paper';
import MapLibreGL from '@maplibre/maplibre-react-native';

import * as config from '../../config/config';
import {StyleSheet, View} from 'react-native';
import {useCallback, useState} from 'react';
import {Coordinates} from '../../features/events/ui/CreateEvent';

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
  const theme = useTheme();

  const handleClick = useCallback(
    (cords: number[]) => {
      setCoordinates(cords);
      // console.log(cords);
      // console.log(coordinates);
      setTargetCoordinates({
        latitude: cords[0],
        longitude: cords[1],
      });
    },
    [setCoordinates],
  );

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
          //console.log('Coords:', feature.geometry.coordinates);
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
          id={'marker-picker-source'}
          shape={{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coordinates,
            },
          }}>
          <MapLibreGL.SymbolLayer
            id={'marker-picker'}
            style={{
              iconImage:
                'https://icon-library.com/images/map-marker-icon-free/map-marker-icon-free-12.jpg',
              iconSize: 0.1,
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
            style={{backgroundColor: theme.colors.secondary}}
            mode="contained"
            onPress={toggle}>
            Pick place
          </Button>
        </View>
      </Portal>
    </Portal>
  );
};
