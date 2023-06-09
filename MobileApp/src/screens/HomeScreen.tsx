import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import {Text, Button, Card, Portal, useTheme} from 'react-native-paper';
import CreateEvent from '../features/events/ui/CreateEvent';
import {useState} from 'react';
import {useAuth0} from 'react-native-auth0';
import {createStackNavigator} from '@react-navigation/stack';
import EventList from '../features/events/ui/EventList';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const {user, clearCredentials} = useAuth0();
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
      borderRadius: 20,
      margin: 5,
      marginHorizontal: 5,
      paddingVertical: 10,
      backgroundColor: theme.colors.primary,
    },
    text: {
      justifyContent: 'center',
      flexShrink: 1,
    },
    card: {
      flex: 1.0,
      backgroundColor: theme.colors.secondary,
      borderRadius: 20,
      margin: 5,
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
              style={styles.card}
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
              style={styles.card}
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
                style={styles.card}
                onPress={clearCredentials}
                underlayColor={theme.colors.primary}>
                <View style={styles.card}>
                  <Text variant="headlineLarge">Logout</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  flex: 1,
                  margin: 5,
                  marginHorizontal: 5,
                  paddingVertical: 10,
                }}>
                <View style={{flex: 1}}></View>
              </TouchableHighlight>
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
