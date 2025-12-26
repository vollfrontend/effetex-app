import { FC, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationRef';

// State
import { useStore } from '../state/userStore';

// Components
import { MainLayout } from './MainLayout';
import { BottomBarWrapper } from './BottomBarWrapper';
import { SideMenu } from '@/src/components/SideMenu';

//Styles
import { styles } from './styles';

// Функція, що отримує активний маршрут з дерева навігації
function getActiveRouteName(state: any): string | null {
  if (!state || !state.routes || state.index == null) return null;

  let route = state.routes[state.index];

  while (route.state) {
    route = route.state.routes[route.state.index];
  }
  return route.name ?? null;
}

export const RootNavigation: FC = () => {
  const setCurrentRoute = useStore(s => s.setCurrentRoute);
  const setCurrentProductId = useStore(s => s.setCurrentProductId);
  const currentRoute = useStore(s => s.settings.currentRoute);
  const currentProductId = useStore(s => s.settings.currentProductId);
  const loadLanguages = useStore(s => s.loadLanguages);

  // Завантажити мови при старті додатку
  useEffect(() => {
    loadLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Викликати тільки один раз при монтуванні

  const handleStateChange = useCallback(
    (state: any) => {
      const routeName = getActiveRouteName(state);
      if (routeName) {
        setCurrentRoute(routeName);

        // Якщо це не Product екран, очищаємо currentProductId
        if (routeName !== 'Product') {
          setCurrentProductId(null);
        }
      }
    },
    [setCurrentRoute, setCurrentProductId],
  );

  // Відновити збережений маршрут при завантаженні
  const onReady = useCallback(() => {
    if (currentRoute && navigationRef.current) {
      const currentState = navigationRef.current.getState();
      const activeRoute = getActiveRouteName(currentState);

      // Якщо поточний екран не співпадає зі збереженим, навігуємо
      if (activeRoute !== currentRoute) {
        // Для Product екрану потрібен productId
        if (currentRoute === 'Product' && currentProductId) {
          navigationRef.current.navigate('Product', {
            productId: currentProductId,
          });
        } else if (currentRoute !== 'Product') {
          // Для всіх інших маршрутів навігуємо без параметрів
          navigationRef.current.navigate(currentRoute as any);
        }
      }
    }
  }, [currentRoute, currentProductId]);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={handleStateChange}
      onReady={onReady}
    >
      <View style={styles.container}>
        {/* Всі екрани */}
        <MainLayout />

        {/* Фіксоване меню */}
        <BottomBarWrapper />

        {/* Side Menu Overlay */}
        <SideMenu />
      </View>
    </NavigationContainer>
  );
};
