import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {Text, Button, Card, Portal, useTheme} from 'react-native-paper';
import CreateEvent from '../features/events/ui/CreateEvent';
import {useState} from 'react';
import {useAuth0} from 'react-native-auth0';

export default () => {
  const {user, clearCredentials} = useAuth0();
  const [createEventDialogVisible, setCreateEventDialogVisible] =
    useState(false);
  const theme = useTheme();
  const toggleCreateEventDialog = () => {
    setCreateEventDialogVisible(!createEventDialogVisible);
    //console.log(user);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginRight: 10,
        marginLeft: 10,
      }}>
      <View
        style={{
          paddingTop: 10,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <Card
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: 20,
          }}>
          <Card.Title
            title={'Hello ' + user.nickname + '!'}
            titleVariant="displayLarge"
          />
        </Card>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View>
            <Card style={{backgroundColor: theme.colors.secondary}}>
              <Card.Title title="Card Title" />
              <Card.Content>
                <Text variant="titleLarge">Card title</Text>
                <Text variant="bodyMedium">Card content</Text>
              </Card.Content>
            </Card>
          </View>
          <View>
            <Card
              style={{backgroundColor: theme.colors.secondary}}
              onPress={toggleCreateEventDialog}>
              <Card.Content>
                <Text variant="titleLarge">Create event</Text>
              </Card.Content>
            </Card>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View>
            <Card
              style={{backgroundColor: theme.colors.secondary}}
              onPress={clearCredentials}>
              <Card.Content>
                <Text variant="titleLarge">Logout</Text>
              </Card.Content>
            </Card>
          </View>
        </View>
      </View>
      <Portal>
        <CreateEvent
          visible={createEventDialogVisible}
          toggle={toggleCreateEventDialog}
        />
      </Portal>
    </View>
  );
};
