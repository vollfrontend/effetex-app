import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

// Mode types
type AuthMode = 'login' | 'register';

export const AuthScreen = () => {
  const theme = useTheme();
  const [mode, setMode] = useState<AuthMode>('login');

  // State for inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const dynamicStyles = StyleSheet.create({
    container: {
      ...styles.container,
      backgroundColor: theme.background,
    },
    title: {
      ...styles.title,
      color: theme.primary,
    },
    subtitle: {
      ...styles.subtitle,
      color: theme.textSecondary,
    },
    input: {
      ...styles.input,
      backgroundColor: theme.cardBackground,
      color: theme.textPrimary,
      borderColor: theme.border,
    },
    button: {
      ...styles.button,
      backgroundColor: theme.primary,
    },
    buttonText: {
      ...styles.buttonText,
      color: theme.white,
    },
    toggleText: {
      ...styles.toggleText,
      color: theme.textSecondary,
    },
    toggleAction: {
      ...styles.toggleAction,
      color: theme.primary,
    },
  });

  const handleAction = () => {
    if (mode === 'login') {
      console.log('Login with:', email, password);
    } else {
      console.log('Register with:', name, email, password);
    }
  };

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.header}>
            <Text style={dynamicStyles.title}>
              {mode === 'login' ? 'Вхід' : 'Реєстрація'}
            </Text>
            <Text style={dynamicStyles.subtitle}>
              {mode === 'login'
                ? 'Вітаємо знову!'
                : 'Створіть свій акаунт'}
            </Text>
          </View>

          <View style={styles.form}>
            {mode === 'register' && (
              <TextInput
                style={dynamicStyles.input}
                placeholder="Ім'я"
                placeholderTextColor={theme.textSecondary}
                value={name}
                onChangeText={setName}
              />
            )}

            <TextInput
              style={dynamicStyles.input}
              placeholder="Email"
              placeholderTextColor={theme.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={dynamicStyles.input}
              placeholder="Пароль"
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={dynamicStyles.button} onPress={handleAction}>
              <Text style={dynamicStyles.buttonText}>
                {mode === 'login' ? 'Увійти' : 'Зареєструватися'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.toggleContainer}>
            <Text style={dynamicStyles.toggleText}>
              {mode === 'login'
                ? 'Немає акаунту? '
                : 'Вже маєте акаунт? '}
            </Text>
            <TouchableOpacity onPress={toggleMode}>
              <Text style={dynamicStyles.toggleAction}>
                {mode === 'login' ? 'Створити' : 'Увійти'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
