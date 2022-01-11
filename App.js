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
import i18n from 'i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import * as RNLocalize from 'react-native-localize';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {initReactI18next} from 'react-i18next';
import {theme} from './src/styles/theme';
import {store, persistor} from './src/redux/store';
import NavContainer from './src/navigation';
import translations from './src/translations/global';
import {SnackbarProvider} from './src/components/Atoms/Snackbar';
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
  init: () => {
    console.log('-----> init');
  },
  cacheUserLanguage: () => {
    console.log('-----> cacheUserLanguage');
  },
};

i18n.use(languageDetector).use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  debug: false,
  resources: translations,
});

function Loader() {
  return <Spinner visible textContent="" />;
}

function App() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  // TODO: figure out action sheet (ActionSheetProvider) is only required for file Input or the whole app

  return (
    <>
      <StatusBar barStyle="light-content" />
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <SafeAreaProvider
              initialSafeAreaInsets={initialWindowSafeAreaInsets}
            >
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
    </>
  );
}

export default App;
