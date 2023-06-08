import {StyleSheet, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import {Button} from 'react-native-paper';

export default () => {
  const {user, isLoading, authorize} = useAuth0();
  const onPress = async () => {
    try {
      await authorize(
        {
          scope: 'NowaKancelariaRzeszy@outlook.com',
          audience: 'https://eventap-api/',
        },
        {ephemeralSession: true},
      );
    } catch (e) {
      console.log(e);
    }
  };
  const print = () => {
    console.log(user);
    console.log(isLoading);
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={onPress}>
        Login with Auth0
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
