import {useCallback, useEffect, useState} from 'react';
import {Event} from './EventList';
import {useAuth0} from 'react-native-auth0';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Modal,
  Portal,
  Text,
  Title,
  useTheme,
} from 'react-native-paper';
import {View} from 'react-native';
import {cancelJoinEvent} from '../api/cancelJoinEvent';
import {getEventDetails} from '../api/getEventDetails';
import {cancelEvent} from '../api/cancelEvent';

export type EventDetailsDialogProps = {
  visible: boolean;
  toggleDialog: () => void;
  event: Event | undefined;
  reloadList: () => void;
};

type EventDetails = {};

//TODO: modal z informacjami o evencie, ale bardziej bogatym, np dokładna listea uczestników
export default ({
  visible,
  toggleDialog,
  event,
  reloadList,
}: EventDetailsDialogProps) => {
  const [details, setDetails] = useState<Event>();
  const [isLoading, setIsLoading] = useState(true);
  const {getCredentials, user} = useAuth0();
  const [confirmDeleteDialogVisible, setCreateEventDialogVisible] =
    useState(false);
  const theme = useTheme();

  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const toggleConfirmDeleteDialog = useCallback(() => {
    setCreateEventDialogVisible(!confirmDeleteDialogVisible);
  }, [confirmDeleteDialogVisible, setCreateEventDialogVisible]);

  const getAccessToken = async () => {
    const credentials = await getCredentials();
    return credentials.accessToken;
  };

  const fetchEventDetails = useCallback(async () => {
    if (event) {
      const token = await getAccessToken();
      const det = await getEventDetails(token, event.id);
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
      toggleDialog();
    }
  }, [event, details, user]);

  const handleCancelEvent = useCallback(async () => {
    if (details) {
      const token = await getAccessToken();
      await cancelEvent(token, details.id);
      reloadList();
      toggleDialog();
    }
  }, [event, details, user]);

  useEffect(() => {
    //TODO: Verify which way to fetch event details is better
    setIsLoading(false);
    //setDetails(undefined);
    fetchEventDetails();
  }, [event, visible]);
  console.log(event);
  return (
    <Modal
      onDismiss={toggleDialog}
      visible={visible}
      contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
      {details ? (
        <>
          <Title>{event?.title}</Title>
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

            <Text variant="titleMedium">Created by:</Text>
            <Text>
              {details?.owner.username === user.nickname
                ? 'You'
                : details?.owner.username}
            </Text>
            <Text variant="titleMedium">Participants:</Text>
            {details?.participants.map(p => {
              return p.username === user.nickname ? (
                <Text>You</Text>
              ) : (
                <Text>{p.username}</Text>
              );
            })}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button mode="contained" onPress={toggleDialog}>
              Close
            </Button>
            {details?.owner.username === user.nickname ? (
              <>
                <Button mode="contained" onPress={toggleConfirmDeleteDialog}>
                  Cancel
                </Button>
                <Button mode="contained" onPress={toggleConfirmDeleteDialog}>
                  Edit
                </Button>
              </>
            ) : (
              <Button mode="contained" onPress={handleCancelJoin}>
                Cancel join
              </Button>
            )}
          </View>
        </>
      ) : (
        <ActivityIndicator animating={true} />
      )}
      <Portal>
        <Dialog
          visible={confirmDeleteDialogVisible}
          onDismiss={toggleConfirmDeleteDialog}>
          <Dialog.Title>Caution</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to cancel this event?
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{justifyContent: 'space-around'}}>
            <Button
              style={{
                backgroundColor: theme.colors.primary,
                paddingHorizontal: 20,
              }}
              mode="contained"
              onPress={toggleConfirmDeleteDialog}>
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor: theme.colors.error,
                paddingHorizontal: 20,
              }}
              mode="contained"
              onPress={handleCancelEvent}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Modal>
  );
};
