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
import {joinEvent} from '../api/joinEvent';
import {cancelJoinEvent} from '../api/cancelJoinEvent';

export type EventDetailsDialogProps = {
  visible: boolean;
  toggleDialog: () => void;
  event: SingleEventMapGeoJson;
};

type Participant = {
  id: string;
  username: string;
};

export type EventDetails = {
  id: number;
  title: string;
  owner: Participant;
  description: string;
  startDateTime: string;
  participants: Participant[];
  participantsCount: number;
  maxParticipants: number;
};

export default ({visible, toggleDialog, event}: EventDetailsDialogProps) => {
  const [details, setDetails] = useState<EventDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const {getCredentials, user} = useAuth0();

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

  const handleCancelJoin = useCallback(async () => {
    if (details) {
      const token = await getAccessToken();
      await cancelJoinEvent(token, user.sub.slice(6), details.id);
      fetchEventDetails();
    }
  }, [event, details, user]);

  const handleJoin = useCallback(async () => {
    if (details) {
      const token = await getAccessToken();
      await joinEvent(token, user.sub.slice(6), details.id);
      fetchEventDetails();
    }
  }, [event, details, user]);

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
            <Text variant="titleMedium">Description:</Text>
            <Text>{details?.description}</Text>
            <Text variant="titleMedium">When:</Text>
            <Text>{timeFormatter.format(new Date(details.startDateTime))}</Text>
            <Text variant="titleMedium">Participants:</Text>
            <Text>
              {details?.participantsCount}/{details?.maxParticipants}
            </Text>
            <Text variant="titleMedium">Created by:</Text>
            <Text>
              {details?.owner.username === user.nickname
                ? 'You'
                : details?.owner.username}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button mode="contained" onPress={toggleDialog}>
              Close
            </Button>
            {details?.owner?.id ===
            user.sub.slice(6) ? null : details.participants.filter(
                p => p.id === user.sub.slice(6),
              ).length > 0 ? (
              <Button mode="contained" onPress={handleCancelJoin}>
                Cancel join
              </Button>
            ) : (
              <Button mode="contained" onPress={handleJoin}>
                Join event
              </Button>
            )}
          </View>
        </>
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </Modal>
  );
};
