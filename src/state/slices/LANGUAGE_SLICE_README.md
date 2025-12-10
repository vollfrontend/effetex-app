# Language Slice

Цей slice управляє мовами в додатку.

## Структура

### Доступні мови
- **Українська** (uk) - мова за замовчуванням
- **English** (en)
- **Русский** (ru)
- **Polski** (pl)

## Хук useLanguage

Для зручності використання створено хук `useLanguage`, який надає всі необхідні функції для роботи з мовами:

```typescript
import { useLanguage } from '@/src/hooks/useLanguage';

const MyComponent = () => {
  const {
    currentLanguage,           // Код поточної мови
    currentLanguageObject,     // Об'єкт поточної мови
    availableLanguages,        // Всі доступні мови
    setCurrentLanguage,        // Функція для зміни мови
    cycleLanguage,             // Циклічне перемикання мов
    isCurrentLanguage,         // Перевірка, чи є мова поточною
  } = useLanguage();

  return (
    <View>
      <Text>Поточна мова: {currentLanguageObject.nativeName}</Text>
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

  return <Text>Поточна мова: {currentLanguage}</Text>;
};
```

### Зміна мови

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
          key={lang.code}
          onPress={() => setCurrentLanguage(lang.code)}
          style={{
            backgroundColor: currentLanguage === lang.code ? '#FF6B35' : '#fff'
          }}
        >
          <Text>{lang.nativeName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
```

### Циклічне перемикання мов

```typescript
const toggleLanguage = () => {
  const currentIndex = availableLanguages.findIndex(
    lang => lang.code === currentLanguage
  );
  const nextIndex = (currentIndex + 1) % availableLanguages.length;
  setCurrentLanguage(availableLanguages[nextIndex].code);
};
```

## Типи

### Language
```typescript
interface Language {
  code: LanguageCode;        // Код мови ('uk', 'en', 'ru', 'pl')
  name: string;              // Назва мови англійською
  nativeName: string;        // Назва мови рідною мовою
}
```

### LanguageCode
```typescript
type LanguageCode = 'uk' | 'en' | 'ru' | 'pl';
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
