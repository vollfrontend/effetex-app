// Libraries
import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// ПРАВИЛЬНИЙ ІМПОРТ (без фігурних дужок)
import reactotronZustand from 'reactotron-plugin-zustand';

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
  .connect();

// Підключаємо Zustand плагін після створення store (lazy)
if (__DEV__) {
  setTimeout(() => {
    try {
      const { useStore } = require('./state/userStore');
      reactotron.use?.(
        reactotronZustand({
          stores: [{ name: 'UserStore', store: useStore }],
          omitFunctionKeys: true,
        }),
      );
    } catch (error) {
      console.warn('Не вдалося підключити Reactotron Zustand плагін:', error);
    }
  }, 100);
}

export default reactotron;