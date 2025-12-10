# Language Slice - Оновлено для роботи з API

Цей slice управляє мовами в додатку, завантажуючи їх з API.

## Структура

### Доступні мови
Мови завантажуються динамічно з API через запит `getLanguages()`.
Мова за замовчуванням: **Українська** (uk)

### Формат Language з API
```typescript
interface Language {
  language_id: number;  // ID мови
  name: string;         // Назва мови
  code: string;         // Код мови (uk, en, ru, pl, тощо)
}
```

## Автоматичне завантаження

Мови автоматично завантажуються при старті додатку в `RootNavigation` компоненті.

```typescript
// src/navigation/index.tsx
useEffect(() => {
  if (!isLanguagesLoaded) {
    loadLanguages();
  }
}, [loadLanguages, isLanguagesLoaded]);
```

## Хук useLanguage

Для зручності використання створено хук `useLanguage`, який надає всі необхідні функції для роботи з мовами:

```typescript
import { useLanguage } from '@/src/hooks/useLanguage';

const MyComponent = () => {
  const {
    currentLanguage,           // Код поточної мови (string)
    currentLanguageId,         // ID поточної мови (number)
    currentLanguageObject,     // Об'єкт поточної мови (Language | undefined)
    availableLanguages,        // Всі доступні мови (Language[])
    isLanguagesLoaded,         // Чи завантажені мови (boolean)
    setCurrentLanguage,        // Функція для зміни мови за кодом
    setCurrentLanguageById,    // Функція для зміни мови за ID
    loadLanguages,             // Функція для завантаження мов
    cycleLanguage,             // Циклічне перемикання мов
    isCurrentLanguage,         // Перевірка, чи є мова поточною
  } = useLanguage();

  return (
    <View>
      <Text>Поточна мова: {currentLanguageObject?.name}</Text>
      <Button onPress={cycleLanguage} title="Наступна мова" />
    </View>
  );
};
```

## Пряме використання store

Якщо ви не хочете використовувати хук, можете працювати безпосередньо зі store:

### Отримання поточної мови

```typescript
import { useStore } from '@/src/state/userStore';

const MyComponent = () => {
  const currentLanguage = useStore(state => state.currentLanguage);
  const currentLanguageId = useStore(state => state.currentLanguageId);

  return <Text>Поточна мова: {currentLanguage} (ID: {currentLanguageId})</Text>;
};
```

### Зміна мови за кодом

```typescript
import { useStore } from '@/src/state/userStore';

const LanguageSelector = () => {
  const setCurrentLanguage = useStore(state => state.setCurrentLanguage);

  const changeToEnglish = () => {
    setCurrentLanguage('en');
  };

  return (
    <Button onPress={changeToEnglish} title="Switch to English" />
  );
};
```

### Зміна мови за ID

```typescript
import { useStore } from '@/src/state/userStore';

const LanguageSelector = () => {
  const setCurrentLanguageById = useStore(state => state.setCurrentLanguageById);

  const changeToLanguage = (languageId: number) => {
    setCurrentLanguageById(languageId);
  };

  return (
    <Button onPress={() => changeToLanguage(2)} title="Change Language" />
  );
};
```

### Отримання всіх доступних мов

```typescript
import { useStore } from '@/src/state/userStore';

const LanguageList = () => {
  const availableLanguages = useStore(state => state.availableLanguages);
  const currentLanguage = useStore(state => state.currentLanguage);
  const setCurrentLanguage = useStore(state => state.setCurrentLanguage);

  return (
    <View>
      {availableLanguages.map(lang => (
        <TouchableOpacity
          key={lang.language_id}
          onPress={() => setCurrentLanguage(lang.code)}
          style={{
            backgroundColor: currentLanguage === lang.code ? '#FF6B35' : '#fff'
          }}
        >
          <Text>{lang.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
```

### Циклічне перемикання мов

```typescript
const { availableLanguages, currentLanguage, setCurrentLanguage } = useLanguage();

const toggleLanguage = () => {
  const currentIndex = availableLanguages.findIndex(
    lang => lang.code === currentLanguage
  );
  const nextIndex = (currentIndex + 1) % availableLanguages.length;
  if (availableLanguages[nextIndex]) {
    setCurrentLanguage(availableLanguages[nextIndex].code);
  }
};
```

### Завантаження мов вручну

```typescript
import { useStore } from '@/src/state/userStore';

const RefreshLanguages = () => {
  const loadLanguages = useStore(state => state.loadLanguages);
  const isLanguagesLoaded = useStore(state => state.isLanguagesLoaded);

  return (
    <View>
      <Text>Мови завантажені: {isLanguagesLoaded ? 'Так' : 'Ні'}</Text>
      <Button onPress={loadLanguages} title="Оновити мови" />
    </View>
  );
};
```

## Готові компоненти

### LanguageSelector

Готовий компонент для вибору мови з красивим UI:

```typescript
import { LanguageSelector } from '@/src/components/LanguageSelector';

const SettingsScreen = () => {
  return (
    <View>
      <LanguageSelector />
    </View>
  );
};
```

Компонент автоматично відображає всі доступні мови та підсвічує поточну вибрану мову.

## Приклади використання

### SideMenu

Дивіться `/src/components/SideMenu/index.tsx` для прикладу реалізації перемикача мов з циклічним перебором всіх доступних мов.

### RootNavigation

Дивіться `/src/navigation/index.tsx` для прикладу автоматичного завантаження мов при старті додатку.

## API

### Функції LanguageSlice

- `loadLanguages()` - Завантажити мови з API
- `setAvailableLanguages(languages)` - Встановити доступні мови вручну
- `setCurrentLanguage(code)` - Встановити поточну мову за кодом
- `setCurrentLanguageById(id)` - Встановити поточну мову за ID
- `getCurrentLanguageObject()` - Отримати об'єкт поточної мови

### Стан LanguageSlice

- `availableLanguages: Language[]` - Всі доступні мови
- `currentLanguage: string` - Код поточної мови
- `currentLanguageId: number` - ID поточної мови
- `isLanguagesLoaded: boolean` - Чи завантажені мови
