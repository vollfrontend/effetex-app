import React, { useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useStore } from '@/src/state/userStore';

/**
 * Компонент для швидкої діагностики стану мов
 * Додайте його на будь-який екран для перевірки
 */
export const QuickLanguageDebug = () => {
  const availableLanguages = useStore(state => state.availableLanguages);
  const currentLanguage = useStore(state => state.currentLanguage);
  const currentLanguageId = useStore(state => state.currentLanguageId);
  const isLanguagesLoaded = useStore(state => state.isLanguagesLoaded);
  const loadLanguages = useStore(state => state.loadLanguages);

  useEffect(() => {
    console.log('=== QuickLanguageDebug State ===');
    console.log('isLanguagesLoaded:', isLanguagesLoaded);
    console.log('availableLanguages count:', availableLanguages.length);
    console.log('currentLanguage:', currentLanguage);
    console.log('currentLanguageId:', currentLanguageId);
    console.log('availableLanguages:', availableLanguages);
    console.log('================================');
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Language Debug</Text>

      <Text style={styles.label}>Loaded: {isLanguagesLoaded ? '✅ YES' : '❌ NO'}</Text>
      <Text style={styles.label}>Count: {availableLanguages.length}</Text>
      <Text style={styles.label}>Current: {currentLanguage || '(empty)'}</Text>
      <Text style={styles.label}>ID: {currentLanguageId || 0}</Text>

      {availableLanguages.length > 0 && (
        <ScrollView style={styles.list}>
          {availableLanguages.map((lang, index) => (
            <Text key={index} style={styles.item}>
              {index + 1}. {lang.name} ({lang.code}) - ID: {lang.language_id}
            </Text>
          ))}
        </ScrollView>
      )}

      <Button
        title="🔄 Reload Languages"
        onPress={() => {
          console.log('Manual reload triggered');
          loadLanguages();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginVertical: 2,
  },
  list: {
    maxHeight: 100,
    marginVertical: 8,
  },
  item: {
    fontSize: 12,
    paddingVertical: 2,
  },
});
