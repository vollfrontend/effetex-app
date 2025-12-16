# PromoSlider - Головний слайдер

## Опис
Компонент головного слайдера з автоматичним прокручуванням, підтримкою локальних та віддалених зображень, назв та посилань.

## Особливості
- ✅ Автоматичне прокручування (3 секунди)
- ✅ Підтримка локальних зображень з `assets/images`
- ✅ Підтримка віддалених зображень (URL)
- ✅ Назви на слайдах з напівпрозорим фоном
- ✅ Кожен слайд є посиланням (TouchableOpacity)
- ✅ Пагінація з індикатором активного слайду
- ✅ Зупинка автоплею при ручному прокручуванні

## Використання

### Базовий приклад
```tsx
import PromoSlider from '@/src/components/PromoSlider';
import slidesData from '@/src/data/slides.json';

const handleSlidePress = (link: string) => {
  console.log('Перехід до:', link);
  // Навігація або інша логіка
};

<PromoSlider
  data={slidesData}
  onSlidePress={handleSlidePress}
/>
```

## Структура даних (slides.json)

```json
[
  {
    "id": "1",
    "title": "ГОТЕЛІ ТА МОТЕЛІ",
    "image": "1jpg",
    "link": "hotels"
  }
]
```

### Поля:
- `id` (обов'язково) - унікальний ідентифікатор слайду
- `title` (опціонально) - назва, що відображається на слайді
- `image` (обов'язково) - назва файлу з `assets/images` або URL
- `link` (опціонально) - ідентифікатор для навігації при кліку

## Додавання нових зображень

1. Додайте зображення до `assets/images/`
2. Додайте його до мапи `localImages` в `index.tsx`:
```tsx
const localImages = {
  'my-image': require('@/assets/images/my-image.jpg'),
};
```
3. Додайте слайд до `slides.json`

## Props

| Prop | Тип | Опис |
|------|-----|------|
| data | SlideItem[] | Масив слайдів |
| onSlidePress | (link: string) => void | Callback при кліку на слайд |

## Стилізація

Стилі знаходяться в `styles.ts`. Основні:
- `wrapper` - контейнер слайдера
- `slide` - окремий слайд
- `slideImage` - зображення слайду
- `titleOverlay` - напівпрозорий фон для назви
- `slideTitle` - текст назви
- `pagination` - пагінація
- `dot` / `activeDot` - індикатори

