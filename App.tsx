import { FC, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initI18n } from '@/src/i18n';
import { RootNavigation } from '@/src/navigation';
import { toastConfig } from '@/src/utils/toastConfig';

const App: FC = () => {
  const [isI18nReady, setIsI18nReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      await initI18n(); // ⭐ ініціалізація i18n
      setIsI18nReady(true);
    };

    load();
  }, []);

  if (!isI18nReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <RootNavigation />
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
