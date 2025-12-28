import { BottomBar } from '@/src/components/BottomBar';
import { nav } from './navigationRef';

import { useStore } from '@/src/state/userStore';

export const BottomBarWrapper = () => {
  const currentRoute = useStore(state => state.settings.currentRoute);
  // const setSideMenuOpen = useStore(state => state.setSideMenuOpen);
  const setSideMenuOpen = useStore(state => state.setSideMenuOpen);
  const isSideMenuOpen = useStore(state => state.settings.isSideMenuOpen);

  // Якщо маршрут ще не встановлено — вважаємо Home
  const route = currentRoute ?? 'Home';

  // Спеціальний бар для Product — тепер він рендериться всередині ProductScreen
  if (route === 'Product') {
    return null;
  }

  const activeTab = isSideMenuOpen
    ? 'profile'
    : route === 'Home'
    ? 'home'
    : route === 'Search'
    ? 'search'
    : route === 'Categories'
    ? 'categories'
    : route === 'Cart'
    ? 'cart'
    : route === 'Favorites'
    ? 'favorites'
    : route === 'Profile'
    ? 'profile'
    : 'none';

  return (
    <BottomBar
      activeTab={activeTab}
      onNavigate={screen => {
        if (screen === 'Profile') {
          setSideMenuOpen(true);
        } else {
          nav(screen);
        }
      }}
    />
  );
};
