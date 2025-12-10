import { FC, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationRef';
import { MainLayout } from './MainLayout';
import { useStore } from '../state/userStore';
import { BottomBarWrapper } from './BottomBarWrapper';
import { SideMenu } from '@/src/components/SideMenu';
import { View } from 'react-native';

// Zustand store

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
  const loadLanguages = useStore(s => s.loadLanguages);

  // Завантажити мови при старті додатку
  useEffect(() => {
    console.log('🚀 App started, loading languages...');
    loadLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Викликати тільки один раз при монтуванні

  const handleStateChange = useCallback(
    (state: any) => {
      const routeName = getActiveRouteName(state);
      if (routeName) setCurrentRoute(routeName);
    },
    [setCurrentRoute],
  );

  return (
    <NavigationContainer ref={navigationRef} onStateChange={handleStateChange}>
      <View style={{ flex: 1 }}>
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
