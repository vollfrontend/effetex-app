import { useStore } from '@/src/state/userStore';

/**
 * Хук для роботи з мовами
 * Надає зручний доступ до поточної мови та функцій для її зміни
 */
export const useLanguage = () => {
  const availableLanguages = useStore(state => state.availableLanguages);
  const currentLanguage = useStore(state => state.settings.currentLanguage);
  const currentLanguageId = useStore(state => state.settings.currentLanguageId);
  const isLanguagesLoaded = useStore(state => state.settings.isLanguagesLoaded);
  const setCurrentLanguage = useStore(state => state.setCurrentLanguage);
  const setCurrentLanguageById = useStore(state => state.setCurrentLanguageById);
  const loadLanguages = useStore(state => state.loadLanguages);

  /**
   * Отримати об'єкт поточної мови
   */
  const getCurrentLanguageObject = () => {
    return availableLanguages.find(lang => lang.code === currentLanguage);
  };

  /**
   * Перемкнути на наступну мову в списку
   */
  const cycleLanguage = () => {
    if (availableLanguages.length === 0) return;

    const currentIndex = availableLanguages.findIndex(
      lang => lang.code === currentLanguage
    );
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    if (availableLanguages[nextIndex]) {
      setCurrentLanguage(availableLanguages[nextIndex].code);
    }
  };

  /**
   * Перевірити, чи є мова поточною
   */
  const isCurrentLanguage = (code: string) => {
    return currentLanguage === code;
  };

  return {
    // Дані
    availableLanguages,
    currentLanguage,
    currentLanguageId,
    currentLanguageObject: getCurrentLanguageObject(),
    isLanguagesLoaded,

    // Функції
    setCurrentLanguage,
    setCurrentLanguageById,
    loadLanguages,
    cycleLanguage,
    isCurrentLanguage,
  };
};
