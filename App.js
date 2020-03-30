import React, { useEffect, Fragment, Suspense } from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { theme } from './src/styles/theme';
import Store from './src/redux/store';
import NavContainer from './src/navigation';
import i18next from 'i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import { initReactI18next } from 'react-i18next';
import translations from './src/translations/global';
import * as RNLocalize from 'react-native-localize';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => {
    const languages = Object.keys(translations);
    const { languageTag } = RNLocalize.findBestAvailableLanguage(languages) || { languageTag: 'en' };
    cb(languageTag);
  },
  init: () => { },
  cacheUserLanguage: () => { },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: translations,
  });

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
            <Suspense fallback={<Spinner
              visible={true}
              textContent={''} />
            }>
              <NavContainer />
            </Suspense>
          </SafeAreaProvider>
        </PaperProvider>
      </StoreProvider>
    </Fragment>
  );
};

export default App;
