import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import {Text, Button, Card, Portal, useTheme} from 'react-native-paper';
import CreateEvent from '../features/events/ui/CreateEvent';
import {useState} from 'react';
import {useAuth0} from 'react-native-auth0';
import {createStackNavigator} from '@react-navigation/stack';
import EventList from '../features/events/ui/EventList';
import {useNavigation} from '@react-navigation/native';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import 'text-encoding-polyfill';

export default () => {
  const {user, clearSession} = useAuth0();
  const [createEventDialogVisible, setCreateEventDialogVisible] =
    useState(false);
  const theme = useTheme();
  const toggleCreateEventDialog = () => {
    setCreateEventDialogVisible(!createEventDialogVisible);
    console.log(user);
  };
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    helloContainer: {
      borderRadius: 5,
      margin: 5,
      marginHorizontal: 15,
      paddingVertical: 30,
      backgroundColor: theme.colors.primary,
    },
    text: {
      justifyContent: 'center',
      flexShrink: 1,
    },
    cardLeft: {
      flex: 1.0,
      backgroundColor: theme.colors.secondary,
      borderRadius: 5,
      margin: 5,
      marginLeft: 15,
      marginHorizontal: 5,
      paddingVertical: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardRight: {
      flex: 1.0,
      backgroundColor: theme.colors.secondary,
      borderRadius: 5,
      margin: 5,
      marginRight: 15,
      marginHorizontal: 5,
      paddingVertical: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <View style={styles.helloContainer}>
          <Text style={styles.text} variant="displayLarge">
            {'Hello ' + user.nickname + '!'}
          </Text>
        </View>
        <View style={styles.row}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableHighlight
              style={styles.cardLeft}
              activeOpacity={0.85}
              underlayColor={theme.colors.primary}
              onPress={toggleCreateEventDialog}>
              <View>
                <Text style={styles.text} variant="headlineLarge">
                  Create event
                </Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={theme.colors.primary}
              style={styles.cardRight}
              onPress={() => navigation.navigate('EventList')}>
              <View>
                <Text style={styles.text} variant="headlineLarge">
                  Your events
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.row}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableHighlight
                style={styles.cardLeft}
                onPress={clearSession}
                underlayColor={theme.colors.secondary}>
                <View style={styles.cardLeft}>
                  <Text variant="headlineLarge">Logout</Text>
                </View>
              </TouchableHighlight>

              <View
                style={{
                  ...styles.cardRight,
                  backgroundColor: theme.colors.background,
                }}></View>
            </View>
          </View>
        </View>
        <Portal>
          <CreateEvent
            visible={createEventDialogVisible}
            toggle={toggleCreateEventDialog}
            mode="create"
          />
        </Portal>
      </View>
    </>
  );
};
