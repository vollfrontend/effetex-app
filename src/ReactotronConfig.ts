// Libraries
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reactotron config for React Native
const reactotron = Reactotron.configure({
  name: 'StoreApp', // app name in Reactotron
  host: '10.0.2.2', // for iOS simulator; use 10.0.2.2 for Android emulator
})
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative()
  .connect();

export default reactotron;
