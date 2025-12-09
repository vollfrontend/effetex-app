/**
 * @format
 */

if (__DEV__) {
  // Reactotron must be initialized before AppRegistry

  require('./src/ReactotronConfig');
}

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
