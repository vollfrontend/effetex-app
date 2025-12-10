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

export const SideMenu = () => {
  const isSideMenuOpen = useStore(state => state.isSideMenuOpen);
  const setSideMenuOpen = useStore(state => state.setSideMenuOpen);

  // Settings
  const themeMode = useStore(state => state.theme);
  const setTheme = useStore(state => state.setTheme);
  const language = useStore(state => state.language);
  const setLanguage = useStore(state => state.setLanguage);
  const theme = useTheme();

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

  const toggleLanguage = () => {
    setLanguage(language === 'uk' ? 'en' : 'uk');
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
        <Text style={dynamicStyles.title}>Menu</Text>

        <TouchableOpacity
          style={dynamicStyles.signInButton}
          onPress={() => {
            handleClose();
            nav('Auth');
          }}
        >
          <Text style={dynamicStyles.signInText}>Увійти</Text>
        </TouchableOpacity>

        {/* Theme Toggle */}
        <View style={dynamicStyles.menuItem}>
          <Text style={dynamicStyles.menuItemText}>Темна тема</Text>
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
        >
          <Text style={dynamicStyles.menuItemText}>Мова</Text>
          <Text style={dynamicStyles.menuItemValue}>
            {language === 'uk' ? 'UA' : 'EN'}
          </Text>
        </TouchableOpacity>

        {/* Example items */}
        <TouchableOpacity style={dynamicStyles.menuItem} onPress={handleClose}>
          <Text style={dynamicStyles.menuItemText}>Налаштування</Text>
        </TouchableOpacity>

        <TouchableOpacity style={dynamicStyles.menuItem} onPress={handleClose}>
          <Text style={dynamicStyles.menuItemText}>Допомога</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
