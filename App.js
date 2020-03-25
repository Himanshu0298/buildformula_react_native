import React, { useEffect, Fragment } from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { theme } from './src/styles/theme';
import Store from './src/redux/store';
import NavContainer from './src/navigation';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <StoreProvider store={Store}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
            <NavContainer />
          </SafeAreaProvider>
        </PaperProvider>
      </StoreProvider>
    </Fragment>
  );
};

export default App;
