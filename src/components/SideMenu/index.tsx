import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Switch,
  PanResponder,
  StyleSheet,
} from 'react-native';
import { useStore } from '@/src/state/userStore';
import { styles, CONFIG } from './styles';
import { useTheme } from '@/src/hooks/useTheme';
import { nav } from '@/src/navigation/navigationRef';
import { showSuccess } from '@/src/utils/toast';
import { logoutCustomer } from '@/src/api/shopApi';

// i18n
import { AvailableLang, changeLanguage } from '@/src/i18n';
import { useTranslation } from 'react-i18next';

export const SideMenu = () => {
  const isSideMenuOpen = useStore(state => state.settings.isSideMenuOpen);
  const setSideMenuOpen = useStore(state => state.setSideMenuOpen);

  // Auth
  // Auth
  const user = useStore(state => state.user);
  const isAuthenticated = useStore(state => state.settings.isAuthenticated);
  const logout = useStore(state => state.logout);

  // Settings
  const themeMode = useStore(state => state.settings.theme);
  const setTheme = useStore(state => state.setTheme);
  const currentLanguage = useStore(state => state.settings.currentLanguage);
  const availableLanguages = useStore(state => state.availableLanguages);
  const setCurrentLanguage = useStore(state => state.setCurrentLanguage);
  const isLanguagesLoaded = useStore(state => state.settings.isLanguagesLoaded);
  const theme = useTheme();
  const { t } = useTranslation();

  const slideAnim = useRef(new Animated.Value(CONFIG.MENU_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSideMenuOpen) {
      // Open
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Close
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: CONFIG.MENU_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSideMenuOpen, slideAnim, fadeAnim]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Detect horizontal swipe
        return (
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          Math.abs(gestureState.dx) > 10
        );
      },
      onPanResponderGrant: () => {
        slideAnim.stopAnimation(value => {
          slideAnim.setOffset(value);
          slideAnim.setValue(0);
        });
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow dragging right (closing)
        if (gestureState.dx > 0) {
          slideAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        slideAnim.flattenOffset();
        // Close if dragged right significantly or flicked
        if (
          gestureState.dx > CONFIG.MENU_WIDTH * 0.25 ||
          gestureState.vx > 0.5
        ) {
          setSideMenuOpen(false);
        } else {
          // Snap back
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const handleClose = () => {
    setSideMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(themeMode === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = async () => {
    if (availableLanguages.length === 0) {
      console.warn('No languages available');
      return;
    }

    // Find next language in list
    const currentIndex = availableLanguages.findIndex(
      lang => lang.code === currentLanguage,
    );
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    const nextLanguage = availableLanguages[nextIndex];

    if (!nextLanguage || !nextLanguage.code) return;

    // 1️⃣ Update Zustand
    setCurrentLanguage(nextLanguage.code);

    // 2️⃣ Update i18next
    await changeLanguage(nextLanguage.code as AvailableLang);

    // 3️⃣ Optional: close the menu
    // setSideMenuOpen(false);
  };

  const handleLogout = async () => {
    if (user?.token) {
      try {
        await logoutCustomer(user.token);
      } catch (error) {
        console.error('Не вдалося виконати logout:', error);
      }
    }

    logout();
    handleClose();
    showSuccess(t('auth.success'), t('auth.logoutSuccess'));
    nav('Home');
  };

  // Dynamic styles based on theme
  const dynamicStyles = StyleSheet.create({
    menu: {
      ...styles.menu,
      backgroundColor: theme.cardBackground,
    },
    title: {
      ...styles.title,
      color: theme.textPrimary,
    },
    signInButton: {
      ...styles.signInButton,
      backgroundColor: theme.primary,
    },
    signInText: {
      ...styles.signInText,
      color: theme.white,
    },
    userBlock: {
      backgroundColor: theme.background,
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
    },
    userName: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textPrimary,
      marginBottom: 8,
    },
    userEmail: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 12,
    },
    logoutButton: {
      backgroundColor: theme.error || '#FF3B30',
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: 'center',
    },
    logoutText: {
      color: theme.white,
      fontSize: 14,
      fontWeight: '600',
    },
    menuItem: {
      ...styles.menuItem,
      borderBottomColor: theme.border,
    },
    menuItemText: {
      ...styles.menuItemText,
      color: theme.textPrimary,
    },
    menuItemValue: {
      ...styles.menuItemValue,
      color: theme.primary,
    },
  });

  // We need to render it always to allow animation to finish,
  // but we can disable pointer events when closed.
  const pointerEvents = isSideMenuOpen ? 'auto' : 'none';

  return (
    <View style={styles.overlay} pointerEvents={pointerEvents}>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      {/* Menu Panel */}
      <Animated.View
        style={[
          dynamicStyles.menu,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={dynamicStyles.title}>{t('sideMenu.menu')}</Text>

        {isAuthenticated && user ? (
          // Блок залогіненого користувача
          <View style={dynamicStyles.userBlock}>
            <Text style={dynamicStyles.userName}>
              {user.firstname} {user.lastname}
            </Text>
            <Text style={dynamicStyles.userEmail}>{user.email}</Text>
            <TouchableOpacity
              style={dynamicStyles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={dynamicStyles.logoutText}>
                {t('sideMenu.logout')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Кнопка входу для незалогінених
          <TouchableOpacity
            style={dynamicStyles.signInButton}
            onPress={() => {
              handleClose();
              nav('Auth');
            }}
          >
            <Text style={dynamicStyles.signInText}>{t('sideMenu.signIn')}</Text>
          </TouchableOpacity>
        )}

        {/* Theme Toggle */}
        <View style={dynamicStyles.menuItem}>
          <Text style={dynamicStyles.menuItemText}>
            {t('sideMenu.darkTheme')}
          </Text>
          <Switch
            value={themeMode === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: theme.primary }}
            thumbColor={theme.white}
          />
        </View>

        {/* Language Selector */}
        <TouchableOpacity
          style={dynamicStyles.menuItem}
          onPress={toggleLanguage}
          disabled={!isLanguagesLoaded || availableLanguages.length === 0}
        >
          <Text style={dynamicStyles.menuItemText}>
            {t('sideMenu.language')}
          </Text>
          <Text style={dynamicStyles.menuItemValue}>
            {!isLanguagesLoaded
              ? t('sideMenu.loading')
              : availableLanguages.length === 0
              ? t('sideMenu.noLanguages')
              : availableLanguages.find(lang => lang.code === currentLanguage)
                  ?.name ||
                availableLanguages[0]?.name ||
                '-'}
          </Text>
        </TouchableOpacity>

        {/* Example items */}
        <TouchableOpacity style={dynamicStyles.menuItem} onPress={handleClose}>
          <Text style={dynamicStyles.menuItemText}>
            {t('sideMenu.settings')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={dynamicStyles.menuItem} onPress={handleClose}>
          <Text style={dynamicStyles.menuItemText}>{t('sideMenu.help')}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
