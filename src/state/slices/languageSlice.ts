import type { LanguageSlice, RootState, Language } from '@/src/state/types';
import { getLanguages } from '@/src/api/shopApi';

type StoreSet = (
  partial:
    | RootState
    | Partial<RootState>
    | ((state: RootState) => RootState | Partial<RootState>),
) => void;
type StoreGet = () => RootState;

export const createLanguageSlice = (
  set: StoreSet,
  get: StoreGet,
): LanguageSlice => ({
  availableLanguages: [],
  // currentLanguage, currentLanguageId, isLanguagesLoaded moved to SettingsSlice

  // Завантажити мови з API
  loadLanguages: async () => {
    try {
      console.log('🔄 Starting to load languages from API...');
      const response = await getLanguages();
      console.log('📦 Raw response from API:', response);

      // API повертає об'єкт, а не масив - конвертуємо
      let languages: Language[] = [];

      if (response) {
        if (Array.isArray(response)) {
          // Якщо це масив - використовуємо як є
          languages = response;
        } else if (typeof response === 'object') {
          // Якщо це об'єкт - конвертуємо в масив
          languages = Object.values(response);
          console.log('🔄 Converted object to array');
        }
      }

      console.log(
        '✅ Loaded languages from API:',
        languages.length,
        'languages',
      );

      if (languages && languages.length > 0) {
        set((state) => ({
          availableLanguages: languages,
          settings: { ...state.settings, isLanguagesLoaded: true },
        }));

        // Знайти українську мову за замовчуванням
        // const currentState = get();

        // Шукаємо українську мову (може бути 'uk', 'ua', 'uk-ua', тощо)
        const ukLang = languages.find(
          lang =>
            lang.code === 'uk' ||
            lang.code === 'ua' ||
            lang.code.startsWith('uk-') ||
            lang.code.startsWith('ua-') ||
            lang.code.toLowerCase().includes('uk'),
        );

        const defaultLang = ukLang || languages[0];

        console.log(
          '✅ Default language set to:',
          defaultLang.name,
          `(${defaultLang.code})`,
        );
        set((state) => ({
          settings: {
            ...state.settings,
            currentLanguage: defaultLang.code,
            currentLanguageId: defaultLang.language_id,
          },
        }));
      } else {
        console.warn('⚠️ No languages received from API');
        console.warn('⚠️ Response was:', response);
        set((state) => ({
          settings: { ...state.settings, isLanguagesLoaded: true },
        }));
      }
    } catch (error) {
      console.error('❌ Failed to load languages:', error);
      console.error('❌ Error details:', JSON.stringify(error, null, 2));
      set((state) => ({
        settings: { ...state.settings, isLanguagesLoaded: true },
      }));
    }
  },

  // Встановити доступні мови (якщо потрібно встановити вручну)
  setAvailableLanguages: languages => {
    set((state) => ({
      availableLanguages: languages,
      settings: { ...state.settings, isLanguagesLoaded: true },
    }));
  },





  // Отримати об'єкт поточної мови
  getCurrentLanguageObject: () => {
    const state = get();
    return state.availableLanguages.find(
      lang => lang.code === state.settings.currentLanguage,
    );
  },
});
