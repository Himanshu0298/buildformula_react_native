/**
 * @format
 */

import {AppRegistry} from 'react-native';
import codePush from 'react-native-code-push';
import App from './App';
import {name as appName} from './app.json';

import 'react-native-gesture-handler';

// eslint-disable-next-line no-undef
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const CODE_PUSH_OPTIONS = {
  updateDialog: false,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
};

const MyApp = codePush(CODE_PUSH_OPTIONS)(App);

AppRegistry.registerComponent(appName, () => MyApp);
