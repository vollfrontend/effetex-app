# Виправлення помилки перемикання мов в SideMenu

## Проблема
При спробі перемикання мови в боковому меню виникала помилка:
```
TypeError: Cannot read property 'code' of undefined
at toggleLanguage
```

## Причина
Функція `toggleLanguage` намагалася отримати доступ до `code` з елемента масиву, який міг бути `undefined`:
1. Коли `availableLanguages` порожній (мови ще не завантажені)
2. Коли індекс вказує на неіснуючий елемент

## Виправлення

### 1. Додано перевірки в `toggleLanguage` (SideMenu)
```typescript
const toggleLanguage = () => {
  // Перевірка, чи є доступні мови
  if (availableLanguages.length === 0) {
    console.warn('No languages available');
    return;
  }

  // Cycle through available languages
  const currentIndex = availableLanguages.findIndex(
    lang => lang.code === currentLanguage
  );
  const nextIndex = (currentIndex + 1) % availableLanguages.length;
  const nextLanguage = availableLanguages[nextIndex];

  // Перевірка, що елемент існує
  if (nextLanguage && nextLanguage.code) {
    setCurrentLanguage(nextLanguage.code);
  }
};
```

### 2. Додано індикатор завантаження
```typescript
const isLanguagesLoaded = useStore(state => state.isLanguagesLoaded);

// У JSX:
<TouchableOpacity
  disabled={!isLanguagesLoaded || availableLanguages.length === 0}
>
  <Text>
    {!isLanguagesLoaded
      ? 'Завантаження...'
      : availableLanguages.find(lang => lang.code === currentLanguage)?.name || 'UA'}
  </Text>
</TouchableOpacity>
```

### 3. Додано логування для відлагодження
В `languageSlice.ts` додано console.log для відстеження:
- Завантаження мов з API
- Встановлення мови за замовчуванням
- Зміни поточної мови

## Зміни в файлах

### `/src/components/SideMenu/index.tsx`
- ✅ Додано перевірку на порожній масив мов
- ✅ Додано перевірку на існування елемента перед доступом до `code`
- ✅ Додано `isLanguagesLoaded` state
- ✅ Додано `disabled` стан для кнопки перемикання
- ✅ Додано текст "Завантаження..." під час завантаження мов

### `/src/state/slices/languageSlice.ts`
- ✅ Додано логування в `loadLanguages()`
- ✅ Додано логування в `setCurrentLanguage()`
- ✅ Додано попередження при відсутності мов

## Результат
Тепер перемикання мов працює безпечно:
- ✅ Не викликає помилок, якщо мови ще не завантажені
- ✅ Показує статус завантаження користувачу
- ✅ Кнопка неактивна, поки мови не завантажені
- ✅ Додано логування для відлагодження

## Тестування
Перевірте:
1. Відкрийте бокове меню одразу після запуску додатку
2. Спробуйте перемкнути мову
3. Переконайтесь, що:
   - Показується "Завантаження..." під час завантаження
   - Після завантаження з'являється назва мови
   - Перемикання працює без помилок
