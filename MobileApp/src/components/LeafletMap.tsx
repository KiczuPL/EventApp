import Leaflet, {Layers, Markers, TileOptions} from 'react-native-leaflet-ts';

export default () => {
  const markerList: Markers[] = [
    {
      latLng: [52.2165409, 25.0241322, 21],
      iconSize: {
        width: 100,
        height: 100,
      },
      icon: '../assets/axe.svg',
      title: 'AAAA 1',
      disabled: true,
    },
    {
      latLng: [53.2165409, 22.0141322, 21],
      iconSize: {
        width: 25,
        height: 25,
      },
      title: 'Title 2',
    },
  ];

  const options: TileOptions = {
    noWrap: true,
    detectRetina: true,
  };

  const mapLayers: Layers[] = [
    {
      name: 'Floor 1',
      src: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      tileOptions: options,
    },
  ];

  return (
    <>
      <Leaflet
        mapLayers={mapLayers}
        minZoom={1}
        zoom={2}
        maxZoom={6}
        flyTo={{
          latLng: [52.2165409, 21.0141322, 21],
          zoom: 5,
        }}
        markers={markerList}
        backgroundColor="green"
      />
    </>
  );
};
