import React, {Fragment, Suspense, useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {
  SafeAreaProvider,
  initialWindowSafeAreaInsets,
} from 'react-native-safe-area-context';
import i18n from 'i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import * as RNLocalize from 'react-native-localize';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {initReactI18next} from 'react-i18next';
// import {checkPermission} from 'utils/permissions';
import * as Sentry from '@sentry/react-native';
import {DownloadProvider} from 'components/Atoms/Download';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import UpdateDialog from 'components/Atoms/UpdateDialog';
import CodePush from 'react-native-code-push';
import {theme} from './src/styles/theme';
import {store, persistor} from './src/redux/store';
import NavContainer from './src/navigation';
import translations from './src/translations/global';
import {SnackbarProvider} from './src/components/Atoms/Snackbar';
import AlertProvider from './src/components/Atoms/Alert/AlertProvider';

Sentry.init({
  environment: __DEV__ ? 'development' : 'release',
  dsn: 'https://9f461e9c89264233b4b5ed91e2882497@o523674.ingest.sentry.io/6256539',
  tracesSampleRate: __DEV__ ? 0 : 1,
  sampleRate: __DEV__ ? 0 : 1,
});

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
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.ON_NEXT_RESTART,
        mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESTART,
      },
      handleStatusChange,
    );
  }, []);

  const handleStatusChange = status => {
    if (
      status === CodePush.SyncStatus.INSTALLING_UPDATE ||
      status === CodePush.SyncStatus.UPDATE_INSTALLED
    ) {
      setUpdateAvailable(true);
    }
  };

  const restartApp = () => CodePush.restartApp();

  // TODO: figure out action sheet (ActionSheetProvider) is only required for file Input or the whole app

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <SafeAreaProvider
              initialSafeAreaInsets={initialWindowSafeAreaInsets}>
              <Suspense fallback={<Loader />}>
                <InternetConnectionAlert>
                  <DownloadProvider>
                    <SnackbarProvider>
                      <AlertProvider>
                        <ActionSheetProvider>
                          <NavContainer />
                        </ActionSheetProvider>
                      </AlertProvider>
                    </SnackbarProvider>
                  </DownloadProvider>
                </InternetConnectionAlert>
                {updateAvailable ? (
                  <UpdateDialog restartApp={restartApp} />
                ) : null}
              </Suspense>
            </SafeAreaProvider>
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    </>
  );
}

const MyApp = Sentry.wrap(App);

export default MyApp;
