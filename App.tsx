import { FC, useEffect } from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initI18n } from '@/src/i18n';
import { RootNavigation } from '@/src/navigation';

const App: FC = () => {
  useEffect(() => {
    initI18n();
  }, []);

  return <RootNavigation />;
};

export default App;
