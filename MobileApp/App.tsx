import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ChatScreen from './src/screens/ChatScreen';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';

import {pl, registerTranslation} from 'react-native-paper-dates';
registerTranslation('pl', pl);

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Tab = createMaterialBottomTabNavigator();
  return (
    <Provider>
      <NavigationContainer>
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
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
