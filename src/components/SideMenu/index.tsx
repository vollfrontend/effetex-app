import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useStore } from '@/src/state/userStore';
import { styles, CONFIG } from './styles';

const { width } = Dimensions.get('window');

export const SideMenu = () => {
  const isSideMenuOpen = useStore(state => state.isSideMenuOpen);
  const setSideMenuOpen = useStore(state => state.setSideMenuOpen);

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

  const handleClose = () => {
    setSideMenuOpen(false);
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
      >
        <Text style={styles.title}>Menu</Text>

        <TouchableOpacity style={styles.signInButton} onPress={() => {
            // Handle Sign In logic or navigation
            console.log('Sign In Pressed');
            handleClose();
        }}>
          <Text style={styles.signInText}>Увійти</Text>
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
