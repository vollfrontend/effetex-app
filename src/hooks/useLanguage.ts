import { useStore } from '@/src/state/userStore';
import type { LanguageCode } from '@/src/state/types';

/**
 * Хук для роботи з мовами
 * Надає зручний доступ до поточної мови та функцій для її зміни
 */
export const useLanguage = () => {
  const availableLanguages = useStore(state => state.availableLanguages);
  const currentLanguage = useStore(state => state.currentLanguage);
  const setCurrentLanguage = useStore(state => state.setCurrentLanguage);

  /**
   * Отримати об'єкт поточної мови
   */
  const getCurrentLanguageObject = () => {
    return availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0];
  };

  /**
   * Перемкнути на наступну мову в списку
   */
  const cycleLanguage = () => {
    const currentIndex = availableLanguages.findIndex(
      lang => lang.code === currentLanguage
    );
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    setCurrentLanguage(availableLanguages[nextIndex].code);
  };

  /**
   * Перевірити, чи є мова поточною
   */
  const isCurrentLanguage = (code: LanguageCode) => {
    return currentLanguage === code;
  };

  return {
    // Дані
    availableLanguages,
    currentLanguage,
    currentLanguageObject: getCurrentLanguageObject(),

    // Функції
    setCurrentLanguage,
    cycleLanguage,
    isCurrentLanguage,
  };
};
