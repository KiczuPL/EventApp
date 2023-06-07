import React, {useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from '../features/events/screens/MapScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth0} from 'react-native-auth0';
import {ActivityIndicator, Text} from 'react-native-paper';
import {firstLogin} from '../features/events/auth/api/loginRequest';
import {View} from 'react-native';

export default () => {
  const {user, isLoading, getCredentials} = useAuth0();
  const Tab = createMaterialBottomTabNavigator();
  const getAccessToken = async () => {
    const credentials = await getCredentials();
    return credentials.accessToken;
  };
  const fetchUser = async () => {
    const token = await getAccessToken();
    await firstLogin(token, user.sub?.slice(6), user.nickname);
  };

  useEffect(() => {
    if (user && !isLoading) {
      fetchUser();
    }
  }, [user]);
  return (
    <NavigationContainer>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      ) : user ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
              tabBarIcon: ({color}) => <Icon name="map" size={30} />,
            }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({color}) => <Icon name="home" size={30} />,
            }}
          />
          <Tab.Screen
            name="Chats"
            component={ChatScreen}
            options={{
              tabBarIcon: ({color}) => <Icon name="chat" size={30} />,
            }}
          />
        </Tab.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
};
