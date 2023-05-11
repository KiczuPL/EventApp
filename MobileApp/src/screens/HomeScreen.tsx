import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {Text, Button, Card, Portal} from 'react-native-paper';
import CreateEvent from '../components/organisms/CreateEvent';
import {useState} from 'react';

export default () => {
  const [createEventDialogVisible, setCreateEventDialogVisible] =
    useState(false);

  const toggleCreateEventDialog = () => {
    setCreateEventDialogVisible(!createEventDialogVisible);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}>
      <View
        style={{
          paddingTop: 10,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <Card
          style={{
            backgroundColor: 'orange',
            borderRadius: 20,
          }}>
          <Card.Title title="Hello!" titleVariant="displayLarge" />
        </Card>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View>
          <Card style={{backgroundColor: 'red'}}>
            <Card.Title title="Card Title" />
            <Card.Content>
              <Text variant="titleLarge">Card title</Text>
              <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
          </Card>
        </View>
        <View>
          <Card
            style={{backgroundColor: 'green'}}
            onPress={toggleCreateEventDialog}>
            <Card.Content>
              <Text variant="titleLarge">Create event</Text>
            </Card.Content>
          </Card>
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
