import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Auth0Provider} from 'react-native-auth0';
import {pl, registerTranslation} from 'react-native-paper-dates';
import NavigationScreens from './src/navigation/NavigationScreens';

registerTranslation('pl', pl);

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const theme = {...DefaultTheme};
  return (
    <Auth0Provider
      domain="dev-phlbwuivnwgq0kxl.us.auth0.com"
      clientId="2sOliNFRMAkaI0JSwR0SlBWgBZN5i6Kk">
      <PaperProvider theme={theme}>
        <NavigationScreens />
      </PaperProvider>
    </Auth0Provider>
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
