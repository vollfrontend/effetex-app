// Libraries
import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// ПРАВИЛЬНИЙ ІМПОРТ (без фігурних дужок)
import reactotronZustand from 'reactotron-plugin-zustand';

import { useStore } from './state/userStore';

let scriptHostname = 'localhost';
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode?.scriptURL;
  if (scriptURL) {
    scriptHostname = scriptURL.split('://')[1].split(':')[0];
  } else {
    scriptHostname = '10.0.2.2';
  }
}

const reactotron = Reactotron.configure({
  name: 'StoreApp',
  host: scriptHostname,
  port: 9091,
})
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate|localhost:8081/i,
    },
  })
  // Додаємо плагін тут
.use(reactotronZustand({
  stores: [{ name: 'UserStore', store: useStore }],
  omitFunctionKeys: true // ОСЬ ЦЕЙ РЯДОК ПРИБЕРЕ ВСІ МЕТОДИ
}))
  .connect();

export default reactotron;