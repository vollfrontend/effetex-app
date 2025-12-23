import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useStore } from '@/src/state/userStore';

/**
 * Компонент для діагностики стану мов
 * Показує поточний стан завантаження мов та дозволяє перезавантажити їх
 */
export const LanguageDebugger = () => {
  const availableLanguages = useStore(state => state.availableLanguages);
  const currentLanguage = useStore(state => state.settings.currentLanguage);
  const currentLanguageId = useStore(state => state.settings.currentLanguageId);
  const isLanguagesLoaded = useStore(state => state.settings.isLanguagesLoaded);
  const loadLanguages = useStore(state => state.loadLanguages);

  useEffect(() => {
    console.log('LanguageDebugger - State:', {
      availableLanguages,
      currentLanguage,
      currentLanguageId,
      isLanguagesLoaded,
    });
  }, [availableLanguages, currentLanguage, currentLanguageId, isLanguagesLoaded]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Language Debugger</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Is Loaded:</Text>
        <Text style={styles.value}>{isLanguagesLoaded ? 'YES' : 'NO'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Current Language:</Text>
        <Text style={styles.value}>{currentLanguage}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Current Language ID:</Text>
        <Text style={styles.value}>{currentLanguageId}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Available Languages:</Text>
        <Text style={styles.value}>{availableLanguages.length}</Text>
      </View>

      {availableLanguages.map(lang => (
        <View key={lang.language_id} style={styles.langRow}>
          <Text style={styles.langText}>
            {lang.code} - {lang.name} (ID: {lang.language_id})
          </Text>
        </View>
      ))}

      <Button
        title="Reload Languages"
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
    backgroundColor: '#f5f5f5',
    margin: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  label: {
    fontWeight: '600',
    width: 150,
  },
  value: {
    flex: 1,
    color: '#FF6B35',
  },
  langRow: {
    paddingVertical: 4,
    paddingLeft: 16,
  },
  langText: {
    fontSize: 12,
    color: '#666',
  },
});
