import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  Switch,
  PanResponder,
} from 'react-native';
import { useStore } from '@/src/state/userStore';
import { styles, CONFIG } from './styles';
import { COLORS } from '@/src/constants/colors';

const { width } = Dimensions.get('window');

export const SideMenu = () => {
  const isSideMenuOpen = useStore(state => state.isSideMenuOpen);
  const setSideMenuOpen = useStore(state => state.setSideMenuOpen);

  // Settings
  const theme = useStore(state => state.theme);
  const setTheme = useStore(state => state.setTheme);
  const language = useStore(state => state.language);
  const setLanguage = useStore(state => state.setLanguage);

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
         return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
      },
      onPanResponderGrant: () => {
         slideAnim.stopAnimation((value) => {
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
           if (gestureState.dx > CONFIG.MENU_WIDTH * 0.25 || gestureState.vx > 0.5) {
               setSideMenuOpen(false);
           } else {
               // Snap back
               Animated.spring(slideAnim, {
                   toValue: 0,
                   useNativeDriver: true
               }).start();
           }
      }
    })
  ).current;

  const handleClose = () => {
    setSideMenuOpen(false);
  };

  const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
      setLanguage(language === 'uk' ? 'en' : 'uk');
  };

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
          styles.menu,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.title}>Menu</Text>

        <TouchableOpacity style={styles.signInButton} onPress={() => {
            // Handle Sign In logic or navigation
            console.log('Sign In Pressed');
            handleClose();
        }}>
          <Text style={styles.signInText}>Увійти</Text>
        </TouchableOpacity>

        {/* Theme Toggle */}
        <View style={styles.menuItem}>
          <Text style={styles.menuItemText}>Темна тема</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        {/* Language Selector */}
        <TouchableOpacity style={styles.menuItem} onPress={toggleLanguage}>
          <Text style={styles.menuItemText}>Мова</Text>
          <Text style={styles.menuItemValue}>{language === 'uk' ? 'UA' : 'EN'}</Text>
        </TouchableOpacity>

        {/* Example items */}
        <TouchableOpacity style={styles.menuItem} onPress={handleClose}>
          <Text style={styles.menuItemText}>Налаштування</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleClose}>
          <Text style={styles.menuItemText}>Допомога</Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
  );
};
