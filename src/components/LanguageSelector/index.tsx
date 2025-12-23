import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useStore } from '@/src/state/userStore';
import { useTheme } from '@/src/hooks/useTheme';

/**
 * Компонент для вибору мови
 * Відображає всі доступні мови та дозволяє користувачу вибрати одну з них
 */
export const LanguageSelector = () => {
  const availableLanguages = useStore(state => state.availableLanguages);
  const currentLanguage = useStore(state => state.settings.currentLanguage);
  const setCurrentLanguage = useStore(state => state.setCurrentLanguage);
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        Виберіть мову
      </Text>
      <View style={styles.languageList}>
        {availableLanguages.map(lang => {
          const isSelected = currentLanguage === lang.code;

          return (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageItem,
                {
                  backgroundColor: isSelected ? theme.primary : theme.cardBackground,
                  borderColor: theme.border,
                },
              ]}
              onPress={() => setCurrentLanguage(lang.code)}
            >
              <Text
                style={[
                  styles.languageCode,
                  { color: isSelected ? theme.white : theme.textSecondary },
                ]}
              >
                {lang.code.toUpperCase()}
              </Text>
              <Text
                style={[
                  styles.languageName,
                  { color: isSelected ? theme.white : theme.textPrimary },
                ]}
              >
                {lang.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  languageList: {
    gap: 12,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  languageCode: {
    fontSize: 16,
    fontWeight: '700',
    width: 40,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
});
