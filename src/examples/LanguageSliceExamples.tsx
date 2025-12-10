/**
 * Приклад використання Language Slice
 *
 * Цей файл демонструє різні способи роботи з мовами в додатку
 */

import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useStore } from '@/src/state/userStore';
import { useLanguage } from '@/src/hooks/useLanguage';
import { LanguageSelector } from '@/src/components/LanguageSelector';

// Приклад 1: Використання хука useLanguage (рекомендовано)
export const Example1_UseLanguageHook = () => {
  const { currentLanguageObject, cycleLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Приклад 1: Хук useLanguage</Text>
      <Text>Поточна мова: {currentLanguageObject.nativeName}</Text>
      <Button onPress={cycleLanguage} title="Наступна мова" />
    </View>
  );
};

// Приклад 2: Пряме використання store
export const Example2_DirectStore = () => {
  const currentLanguage = useStore(state => state.currentLanguage);
  const setCurrentLanguage = useStore(state => state.setCurrentLanguage);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Приклад 2: Пряме використання store</Text>
      <Text>Код мови: {currentLanguage}</Text>
      <Button
        onPress={() => setCurrentLanguage('en')}
        title="Змінити на English"
      />
    </View>
  );
};

// Приклад 3: Список всіх мов
export const Example3_LanguageList = () => {
  const { availableLanguages, currentLanguage, setCurrentLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Приклад 3: Список мов</Text>
      {availableLanguages.map(lang => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageItem,
            currentLanguage === lang.code && styles.selectedLanguage,
          ]}
          onPress={() => setCurrentLanguage(lang.code)}
        >
          <Text style={styles.languageCode}>{lang.code.toUpperCase()}</Text>
          <Text style={styles.languageName}>{lang.nativeName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Приклад 4: Використання готового компонента
export const Example4_LanguageSelector = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Приклад 4: Готовий компонент</Text>
      <LanguageSelector />
    </View>
  );
};

// Приклад 5: Перевірка поточної мови
export const Example5_CheckLanguage = () => {
  const { isCurrentLanguage, currentLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Приклад 5: Перевірка мови</Text>
      <Text>Поточна мова: {currentLanguage}</Text>
      <Text>Українська активна: {isCurrentLanguage('uk') ? 'Так' : 'Ні'}</Text>
      <Text>English активна: {isCurrentLanguage('en') ? 'Так' : 'Ні'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  languageItem: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedLanguage: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  languageCode: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 40,
  },
  languageName: {
    fontSize: 14,
  },
});
