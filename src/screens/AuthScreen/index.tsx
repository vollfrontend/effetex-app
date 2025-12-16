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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';
import { registerCustomer, loginCustomer } from '@/src/api/shopApi';

// i18n
import { useTranslation } from 'react-i18next';

// Mode types
type AuthMode = 'login' | 'register';

export const AuthScreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);

  // State for inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [telephone, setTelephone] = useState('');

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

  const handleAction = async () => {
    setLoading(true);

    try {
      if (mode === 'login') {
        // Логін
        const response = await loginCustomer({
          email,
          password,
        });

        console.log('Login response:', JSON.stringify(response, null, 2));

        if (response.success) {
          Alert.alert(t('auth.success'), t('auth.loginSuccess'));
          // TODO: Зберегти токен/customer_id у стор
        } else {
          const errorMsg =
            typeof response.error === 'string'
              ? response.error
              : typeof response.message === 'string'
              ? response.message
              : JSON.stringify(response.error || response.message || response);
          Alert.alert(t('auth.error'), errorMsg);
        }
      } else {
        // Реєстрація
        const response = await registerCustomer({
          firstname,
          lastname,
          email,
          telephone,
          password,
        });

        console.log('Register response:', JSON.stringify(response, null, 2));

        if (response.success) {
          Alert.alert(t('auth.success'), t('auth.registerSuccess'));
          // Можна автоматично перейти на логін або залогінити
          setMode('login');
        } else {
          const errorMsg =
            typeof response.error === 'string'
              ? response.error
              : typeof response.message === 'string'
              ? response.message
              : JSON.stringify(response.error || response.message || response);
          Alert.alert(t('auth.error'), errorMsg);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      const errorMsg =
        error instanceof Error ? error.message : JSON.stringify(error);
      Alert.alert(t('auth.error'), errorMsg);
    } finally {
      setLoading(false);
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
              {mode === 'login' ? t('auth.login') : t('auth.register')}
            </Text>
            <Text style={dynamicStyles.subtitle}>
              {mode === 'login'
                ? t('auth.welcomeBack')
                : t('auth.createAccount')}
            </Text>
          </View>

          <View style={styles.form}>
            {mode === 'register' && (
              <>
                <TextInput
                  style={dynamicStyles.input}
                  placeholder={t('auth.firstname')}
                  placeholderTextColor={theme.textSecondary}
                  value={firstname}
                  onChangeText={setFirstname}
                  autoCapitalize="words"
                />
                <TextInput
                  style={dynamicStyles.input}
                  placeholder={t('auth.lastname')}
                  placeholderTextColor={theme.textSecondary}
                  value={lastname}
                  onChangeText={setLastname}
                  autoCapitalize="words"
                />
                <TextInput
                  style={dynamicStyles.input}
                  placeholder={t('auth.telephone')}
                  placeholderTextColor={theme.textSecondary}
                  value={telephone}
                  onChangeText={setTelephone}
                  keyboardType="phone-pad"
                />
              </>
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
              placeholder={t('auth.password')}
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={dynamicStyles.button}
              onPress={handleAction}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={theme.white} />
              ) : (
                <Text style={dynamicStyles.buttonText}>
                  {mode === 'login' ? t('auth.login') : t('auth.register')}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.toggleContainer}>
            <Text style={dynamicStyles.toggleText}>
              {mode === 'login'
                ? t('auth.noAccount')
                : t('auth.alreadyHaveAccount')}
            </Text>
            <TouchableOpacity onPress={toggleMode}>
              <Text style={dynamicStyles.toggleAction}>
                {mode === 'login' ? t('auth.createAccount') : t('auth.login')}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
