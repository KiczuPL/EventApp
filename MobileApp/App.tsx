import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {
  DefaultTheme,
  MD3DarkTheme,
  MD3LightTheme,
  MD2DarkTheme,
  MD2LightTheme,
  Provider as PaperProvider,
  MD2Theme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Auth0Provider} from 'react-native-auth0';
import {pl, registerTranslation} from 'react-native-paper-dates';
import NavigationScreens from './src/navigation/NavigationScreens';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import {NavigationContainer} from '@react-navigation/native';

registerTranslation('pl', pl);

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      weakCardColor: string;
    }
  }
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
    },
  };
  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
      strongCardColor: 'rgba(83, 10, 117, 0.64)',
      weakCardColor: 'rgba(83, 10, 117, 0.46)',
    },
  };

  return (
    <Auth0Provider
      domain="dev-phlbwuivnwgq0kxl.us.auth0.com"
      clientId="2sOliNFRMAkaI0JSwR0SlBWgBZN5i6Kk">
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <NavigationScreens />
        </NavigationContainer>
      </PaperProvider>
    </Auth0Provider>
  );
}

export default App;
