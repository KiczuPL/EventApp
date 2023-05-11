import {View} from 'react-native';
import {Button, Modal, Text, Title} from 'react-native-paper';
import {EventMapGeoJson} from './EventMap';

export type EventDetailsDialogProps = {
  visible: boolean;
  toggleDialog: () => void;
  event: EventMapGeoJson;
};

export default ({visible, toggleDialog, event}: EventDetailsDialogProps) => {
  return (
    <Modal
      onDismiss={toggleDialog}
      visible={visible}
      contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
      <Title>Event: {event.properties.id}</Title>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingBottom: 20,
        }}>
        <Text>Category...</Text>
        <Text>Type...</Text>
        <Text>When...</Text>
        <Text>Where...</Text>
        <Text>How many participants</Text>
        <Text>Max participants</Text>
        <Text>Event description...</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button mode="contained" onPress={toggleDialog}>
          Close
        </Button>
        <Button mode="contained" onPress={toggleDialog}>
          Ask to join
        </Button>
      </View>
    </Modal>
  );
};
