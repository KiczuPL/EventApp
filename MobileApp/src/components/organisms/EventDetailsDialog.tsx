import {View} from 'react-native';
import {Button, Modal, Text, Title} from 'react-native-paper';
import {SingleEventMapGeoJson} from './EventMap';
import {useCallback, useEffect, useState} from 'react';
import {getEventDetails} from '../../features/events/api/getEventDetails';
import {BACKEND_EVENT_API_URL} from '../../features/events/api/constants';

export type EventDetailsDialogProps = {
  visible: boolean;
  toggleDialog: () => void;
  event: SingleEventMapGeoJson;
};

export default ({visible, toggleDialog, event}: EventDetailsDialogProps) => {
  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchEventDetails = useCallback(() => {
    if (event) {
      console.log('CALL for details of event ' + event?.properties?.id + '!');

      fetch(BACKEND_EVENT_API_URL + 'event/' + event.properties.id)
        .then(response => response.json())
        .then(responseJson => {
          console.log('AA--API response: ' + JSON.stringify(responseJson));
          setDetails(responseJson);
        });
    }
  }, [event, setDetails]);

  useEffect(() => {
    if (event && isLoading) {
      fetchEventDetails();
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    //TODO: Verify which way to fetch event details is better
    fetchEventDetails();
    setIsLoading(true);
  }, [event]);
  return (
    <Modal
      onDismiss={toggleDialog}
      visible={visible}
      contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
      <Title>Event: {event?.properties?.id}</Title>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingBottom: 20,
        }}>
        <Text>{details ? JSON.stringify(details) : 'Loading...'}</Text>
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
