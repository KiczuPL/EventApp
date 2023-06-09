import {useCallback, useEffect, useState} from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import {
  ActivityIndicator,
  Card,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import getUserEvents from '../api/getUserEvents';
import {BACKEND_EVENT_PUBLIC_API_URL} from '../api/constants';
import {ScrollView} from 'react-native-gesture-handler';
import EventListDetailsDialog from './EventListDetailsDialog';
import CreateEvent from './CreateEvent';

export type Event = {
  participants: {
    id: string;
    username: string;
  }[];
  owner: {
    id: string;
    username: string;
  };
  id: number;
  title: string;
  description: string;
  iconFilename: string;
  startDateTime: string;
};

export default () => {
  const {user, getCredentials} = useAuth0();
  const [events, setEvents] = useState<Event[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [detailsDialogVisible, setDetailsDialogVisible] =
    useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(
    undefined,
  );

  const theme = useTheme();
  const getAccessToken = async () => {
    const credentials = await getCredentials();
    return credentials.accessToken;
  };

  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const toggleDetailsDialog = useCallback(() => {
    setDetailsDialogVisible(!detailsDialogVisible);
  }, [detailsDialogVisible, setDetailsDialogVisible]);

  const fetchEvents = useCallback(async () => {
    console.log('fetching');
    const token = await getAccessToken();
    const events = await getUserEvents(token, user.sub.slice(6));
    setEvents(events);
    //setEvents(undefined);
    //console.log(events);
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (isLoading) fetchEvents();
  }, [isLoading]);

  const styles = StyleSheet.create({
    card: {
      margin: 5,
      backgroundColor: theme.colors.secondary,
      marginHorizontal: 10,
    },
  });
  console.log(events === undefined || isLoading);
  return (
    <View style={{flex: 1}}>
      {events === undefined || isLoading ? (
        <View
          style={{
            flex: 1,
            paddingRight: 30,
            paddingLeft: 30,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={100} />
        </View>
      ) : (
        <ScrollView>
          {events.map(event => (
            <Card style={styles.card} mode="elevated" elevation={1}>
              <TouchableRipple
                rippleColor={theme.colors.primary}
                style={{flex: 1, borderRadius: 20}}
                onPress={() => {
                  setSelectedEvent(event);
                  toggleDetailsDialog();
                }}>
                <Card.Title
                  title={event.title}
                  subtitle={timeFormatter.format(new Date(event.startDateTime))}
                  left={props => (
                    <Image
                      source={{
                        uri:
                          BACKEND_EVENT_PUBLIC_API_URL +
                          'icon/' +
                          event.iconFilename,
                      }}
                      style={{width: 50, height: 50}}
                    />
                  )}
                />
              </TouchableRipple>
            </Card>
          ))}
        </ScrollView>
      )}
      <EventListDetailsDialog
        key={selectedEvent?.id}
        visible={detailsDialogVisible}
        toggleDialog={toggleDetailsDialog}
        event={selectedEvent}
        reloadList={() => setIsLoading(true)}
      />
    </View>
  );
};
