# Оновлено Language Slice для роботи з API

## Що було змінено

### 1. Language Slice (`/src/state/slices/languageSlice.ts`)
- ✅ Тепер завантажує мови з API через `getLanguages()`
- ✅ Підтримує динамічний список мов
- ✅ Автоматично встановлює українську мову за замовчуванням
- ✅ Зберігає як код мови, так і ID мови
- ✅ Відстежує стан завантаження мов

### 2. Типи (`/src/state/types.ts`)
- ✅ Використовує тип `Language` з API (`/src/api/types.ts`)
- ✅ Додано поля: `currentLanguageId`, `isLanguagesLoaded`
- ✅ Додано функції: `setAvailableLanguages`, `setCurrentLanguageById`, `loadLanguages`

### 3. Автоматичне завантаження (`/src/navigation/index.tsx`)
- ✅ Мови автоматично завантажуються при старті додатку
- ✅ Використовує `useEffect` для завантаження при монтуванні

### 4. Оновлено хук useLanguage (`/src/hooks/useLanguage.ts`)
- ✅ Додано `currentLanguageId` - ID поточної мови
- ✅ Додано `isLanguagesLoaded` - статус завантаження
- ✅ Додано `setCurrentLanguageById` - зміна мови за ID
- ✅ Додано `loadLanguages` - функція завантаження мов
- ✅ Оновлено `cycleLanguage` для роботи з динамічним списком

### 5. Оновлено компоненти
- ✅ `SideMenu` - використовує `lang.name` замість `lang.nativeName`
- ✅ `LanguageSelector` - використовує `lang.name` замість `lang.nativeName`
- ✅ Приклади - оновлені для роботи з новою структурою

### 6. Оновлено документацію
- ✅ `LANGUAGE_SLICE_README.md` - повністю переписана для API
- ✅ Додано приклади роботи з API мовами
- ✅ Додано інформацію про автоматичне завантаження

## Структура Language з API

```typescript
interface Language {
  language_id: number;  // ID мови в базі даних
  name: string;         // Назва мови (наприклад, "Українська")
  code: string;         // Код мови (наприклад, "uk")
}
```

## Як це працює

1. **При старті додатку** (`RootNavigation`):
   - Викликається `loadLanguages()`
   - Виконується запит `getLanguages()` до API
   - Мови зберігаються в `availableLanguages`
   - Встановлюється українська мова за замовчуванням (або перша доступна)

2. **Зміна мови**:
   - За кодом: `setCurrentLanguage('en')`
   - За ID: `setCurrentLanguageById(2)`
   - Циклічно: `cycleLanguage()`

3. **Використання в компонентах**:
   ```typescript
   const { currentLanguageObject, currentLanguageId } = useLanguage();
   // currentLanguageObject?.name - назва мови
   // currentLanguageId - ID для API запитів
   ```

## Приклад використання

### Швидкий старт з хуком:
```typescript
import { useLanguage } from '@/src/hooks/useLanguage';

const MyComponent = () => {
  const {
    currentLanguageObject,
    currentLanguageId,
    cycleLanguage
  } = useLanguage();

  return (
    <View>
      <Text>Мова: {currentLanguageObject?.name}</Text>
      <Text>ID для API: {currentLanguageId}</Text>
      <Button onPress={cycleLanguage} title="Змінити мову" />
    </View>
  );
};
```

### Використання ID мови в API запитах:
```typescript
import { useLanguage } from '@/src/hooks/useLanguage';
import { getCategories } from '@/src/api/shopApi';

const CategoriesScreen = () => {
  const { currentLanguageId } = useLanguage();

  useEffect(() => {
    // Завантажити категорії для поточної мови
    getCategories(currentLanguageId).then(setCategories);
  }, [currentLanguageId]);

  // ...
};
```

## Переваги нового підходу

✅ **Динамічність** - мови завантажуються з сервера, можна легко додавати нові
✅ **Актуальність** - завжди відповідає мовам на сервері
✅ **ID для API** - зберігається `language_id` для використання в інших запитах
✅ **Автоматизація** - мови завантажуються автоматично при старті
✅ **Гнучкість** - можна оновити мови в будь-який момент викликом `loadLanguages()`

## Міграція зі старої версії

Якщо ви використовували стару версію з hardcoded мовами:

**Було:**
```typescript
const { currentLanguageObject } = useLanguage();
console.log(currentLanguageObject.nativeName); // ❌ Більше не працює
```

**Стало:**
```typescript
const { currentLanguageObject } = useLanguage();
console.log(currentLanguageObject?.name); // ✅ Використовуйте name
```

**Зміни:**
- `nativeName` → `name`
- `LanguageCode` (union type) → `string` (код з API)
- Додано `currentLanguageId` для API запитів
- Додано `isLanguagesLoaded` для перевірки стану
