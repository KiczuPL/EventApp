import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';

export default () => {
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
          <Card style={{backgroundColor: 'green'}}>
            <Card.Content>
              <Text variant="titleLarge">Create event</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
};
