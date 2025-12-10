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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

// Mode types
type AuthMode = 'login' | 'register';

export const AuthScreen = () => {
  const [mode, setMode] = useState<AuthMode>('login');

  // State for inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

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
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.header}>
            <Text style={styles.title}>
              {mode === 'login' ? 'Вхід' : 'Реєстрація'}
            </Text>
            <Text style={styles.subtitle}>
              {mode === 'login'
                ? 'Вітаємо знову!'
                : 'Створіть свій акаунт'}
            </Text>
          </View>

          <View style={styles.form}>
            {mode === 'register' && (
              <TextInput
                style={styles.input}
                placeholder="Ім'я"
                value={name}
                onChangeText={setName}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleAction}>
              <Text style={styles.buttonText}>
                {mode === 'login' ? 'Увійти' : 'Зареєструватися'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {mode === 'login'
                ? 'Немає акаунту? '
                : 'Вже маєте акаунт? '}
            </Text>
            <TouchableOpacity onPress={toggleMode}>
              <Text style={styles.toggleAction}>
                {mode === 'login' ? 'Створити' : 'Увійти'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
