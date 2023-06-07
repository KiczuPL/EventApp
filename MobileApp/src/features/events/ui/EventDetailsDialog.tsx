import {View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Modal,
  Text,
  Title,
} from 'react-native-paper';
import {SingleEventMapGeoJson} from './EventMap';
import {useCallback, useEffect, useState} from 'react';
import {useAuth0} from 'react-native-auth0';
import {getEventDetails} from '../api/getEventDetails';
import DeviceInfo from 'react-native-device-info';

export type EventDetailsDialogProps = {
  visible: boolean;
  toggleDialog: () => void;
  event: SingleEventMapGeoJson;
};

export type EventDetails = {
  id: string;
  title: string;
  owner: EventOwner;
  description: string;
  startDateTime: string;
};
type EventOwner = {
  id: number;
  username: string;
};

export default ({visible, toggleDialog, event}: EventDetailsDialogProps) => {
  const [details, setDetails] = useState<EventDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const {getCredentials} = useAuth0();

  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const getAccessToken = async () => {
    const credentials = await getCredentials();
    return credentials.accessToken;
  };

  const fetchEventDetails = useCallback(async () => {
    if (event) {
      const token = await getAccessToken();
      const det = await getEventDetails(token, event.properties.id);
      setDetails(det);
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
    setIsLoading(true);
    setDetails(undefined);
    fetchEventDetails();
  }, [event, visible]);
  return (
    <Modal
      onDismiss={toggleDialog}
      visible={visible}
      contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
      {details ? (
        <>
          <Title>Event: {details?.title}</Title>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
            <Text>{details?.description}</Text>
            <Text>{timeFormatter.format(new Date(details.startDateTime))}</Text>
            <Text>Created by: {details?.owner?.username}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button mode="contained" onPress={toggleDialog}>
              Close
            </Button>
            <Button mode="contained" onPress={toggleDialog}>
              Ask to join
            </Button>
          </View>
        </>
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </Modal>
  );
};
