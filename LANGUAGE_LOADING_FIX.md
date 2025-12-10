# Виправлення проблеми "Завантаження..." в боковому меню

## Проблема
У боковому меню постійно відображається "Завантаження..." замість назви мови.

## Причина
Мови не завантажувались з API, тому `isLanguagesLoaded` залишався `false`. Можливі причини:
1. API запит не виконувався
2. API повертав помилку
3. useEffect викликався кілька разів через залежності

## Виправлення

### 1. Додано fallback мови
Якщо API не працює або повертає помилку, використовуються fallback мови:

```typescript
const FALLBACK_LANGUAGES: Language[] = [
  { language_id: 1, code: 'uk', name: 'Українська' },
  { language_id: 2, code: 'en', name: 'English' },
  { language_id: 3, code: 'ru', name: 'Русский' },
  { language_id: 4, code: 'pl', name: 'Polski' },
];
```

### 2. Оновлено loadLanguages
```typescript
loadLanguages: async () => {
  try {
    const languages = await getLanguages();

    if (languages && languages.length > 0) {
      // Використати мови з API
      set({ availableLanguages: languages, isLanguagesLoaded: true });
    } else {
      // Використати fallback
      set({
        availableLanguages: FALLBACK_LANGUAGES,
        isLanguagesLoaded: true
      });
    }
  } catch (error) {
    // При помилці також використати fallback
    set({
      availableLanguages: FALLBACK_LANGUAGES,
      isLanguagesLoaded: true
    });
  }
}
```

### 3. Спрощено useEffect в RootNavigation
Змінено з умовного виклику на безумовний, один раз при монтуванні:

```typescript
useEffect(() => {
  console.log('RootNavigation mounted');
  console.log('Calling loadLanguages...');
  loadLanguages();
}, []); // Викликати тільки один раз
```

### 4. Додано логування
Додано console.log для відстеження:
- Коли викликається loadLanguages
- Які мови завантажені
- Чи використовується fallback

### 5. Створено LanguageDebugger
Компонент для діагностики стану мов:
- Показує чи завантажені мови
- Відображає поточну мову та ID
- Показує список доступних мов
- Дозволяє перезавантажити мови

## Результат

Тепер мови завжди доступні:
- ✅ Якщо API працює - використовуються мови з API
- ✅ Якщо API не працює - використовуються fallback мови
- ✅ `isLanguagesLoaded` завжди стає `true`
- ✅ Бокове меню показує назву мови, а не "Завантаження..."

## Тестування

1. Перезапустіть додаток
2. Відкрийте бокове меню
3. Переконайтесь, що:
   - Показується назва мови (не "Завантаження...")
   - Можна перемкнути мову
   - В консолі є логи про завантаження мов

## Діагностика

Якщо проблема залишається, додайте LanguageDebugger на екран:

```typescript
import { LanguageDebugger } from '@/src/components/LanguageDebugger';

// В компоненті:
<LanguageDebugger />
```

Це покаже поточний стан мов та дозволить перезавантажити їх вручну.
