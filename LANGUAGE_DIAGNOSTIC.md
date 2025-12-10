# Діагностика проблеми "Немає мов"

## Проблема
В боковому меню показується "Немає мов" замість списку мов.

## Можливі причини

### 1. API не повертає мови
- Перевірте консоль на наявність логів
- Шукайте: `🔄 Starting to load languages from API...`
- Перевірте чи є помилка: `❌ Failed to load languages:`

### 2. API повертає порожній масив
- Шукайте в консолі: `⚠️ No languages received from API`
- Перевірте: `⚠️ Response was:`

### 3. API повертає дані в іншому форматі
- Шукайте: `📦 Raw response from API:`
- Перевірте структуру даних

## Кроки діагностики

### Крок 1: Перевірте консоль
Після запуску додатку мають бути такі логи:
```
🚀 App started, loading languages...
🔄 Starting to load languages from API...
📦 Raw response from API: [...]
✅ Loaded languages from API: 2 languages
📝 Languages data: [...]
✅ Default language set to: UA (uk-ua)
```

### Крок 2: Додайте QuickLanguageDebug
Додайте компонент на HomeScreen для швидкої перевірки:

```typescript
import { QuickLanguageDebug } from '@/src/components/QuickLanguageDebug';

// В компоненті:
<QuickLanguageDebug />
```

Це покаже:
- Чи завантажені мови
- Скільки мов доступно
- Яка поточна мова
- Список всіх мов

### Крок 3: Перевірте API вручну
Спробуйте викликати API вручну в консолі:

```typescript
import { getLanguages } from '@/src/api/shopApi';

getLanguages().then(langs => {
  console.log('Manual API call result:', langs);
});
```

### Крок 4: Перевірте мережу
- Відкрийте React Native Debugger
- Перейдіть на вкладку Network
- Знайдіть запит до `/api/product/getLanguages/`
- Перевірте відповідь

## Можливі рішення

### Якщо API не працює
```typescript
// Тимчасово додайте fallback мови для тестування
const TEMP_LANGUAGES = [
  { language_id: 1, code: 'uk', name: 'Українська' },
  { language_id: 2, code: 'en', name: 'English' },
];

// В loadLanguages, після catch:
set({
  availableLanguages: TEMP_LANGUAGES,
  isLanguagesLoaded: true,
  currentLanguage: 'uk',
  currentLanguageId: 1,
});
```

### Якщо API повертає дані в іншому форматі
Перевірте структуру відповіді і можливо потрібно додати mapping:

```typescript
const languages = await getLanguages();
// Можливо потрібно:
const mappedLanguages = languages.map(lang => ({
  language_id: parseInt(lang.language_id),
  code: lang.code,
  name: lang.name,
}));
```

### Якщо API повертає об'єкт замість масиву
```typescript
const response = await getLanguages();
const languages = Array.isArray(response) ? response : response.data || [];
```

## Очікувана поведінка

При правильній роботі в консолі має бути:
```
🚀 App started, loading languages...
🔄 Starting to load languages from API...
📦 Raw response from API: [{language_id: "3", code: "uk-ua", name: "UA"}, ...]
✅ Loaded languages from API: 2 languages
📝 Languages data: [
  {
    "language_id": "3",
    "code": "uk-ua",
    "name": "UA"
  },
  {
    "language_id": "4",
    "code": "ru-ru",
    "name": "RU"
  }
]
✅ Default language set to: UA (uk-ua)
```

А в боковому меню має показуватись "UA" замість "Немає мов".

## Швидка перевірка

Запустіть в консолі:
```javascript
// Перевірте стан store
const state = useStore.getState();
console.log('Languages state:', {
  loaded: state.isLanguagesLoaded,
  count: state.availableLanguages.length,
  current: state.currentLanguage,
  languages: state.availableLanguages,
});
```
