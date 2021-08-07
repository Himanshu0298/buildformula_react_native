import React, {useEffect, Fragment, Suspense} from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {
  SafeAreaProvider,
  initialWindowSafeAreaInsets,
} from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
import {theme} from './src/styles/theme';
import {store, persistor} from './src/redux/store';
import NavContainer from './src/navigation';
import i18next from 'i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import {initReactI18next} from 'react-i18next';
import translations from './src/translations/global';
import * as RNLocalize from 'react-native-localize';
import {SnackbarProvider} from './src/components/Atoms/Snackbar';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import AlertProvider from './src/components/Atoms/Alert/AlertProvider';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => {
    const languages = Object.keys(translations);
    const {languageTag} = RNLocalize.findBestAvailableLanguage(languages) || {
      languageTag: 'en',
    };
    cb(languageTag);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next.use(languageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  resources: translations,
});

const Loader = () => <Spinner visible={true} textContent={''} />;

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  // TODO: figure out action sheet (ActionSheetProvider) is only required for file Input or the whole app

  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <SafeAreaProvider
              initialSafeAreaInsets={initialWindowSafeAreaInsets}>
              <Suspense fallback={<Loader />}>
                <SnackbarProvider>
                  <AlertProvider>
                    <ActionSheetProvider>
                      <NavContainer />
                    </ActionSheetProvider>
                  </AlertProvider>
                </SnackbarProvider>
              </Suspense>
            </SafeAreaProvider>
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    </Fragment>
  );
};

export default App;
