import ruTranslations from './ru.js';
import enTranslations from './en.js';

let currentLanguage = 'en'; // начальный язык

function updateTexts() {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const translationKey = element.dataset.translate;
    let translation;
    
    if (currentLanguage === 'ru') {
      translation = ruTranslations[translationKey];
    } else if (currentLanguage === 'en') {
      translation = enTranslations[translationKey];
    }
    
    if (translation) {
      element.textContent = translation;
    }
  });
}

function changeLanguage(language) {
  currentLanguage = language;
  localStorage.setItem('language', language); // сохраняем выбранный язык в локальном хранилище
  updateTexts();
}

// при загрузке страницы проверяем, есть ли сохраненный язык в локальном хранилище и устанавливаем его
document.addEventListener('DOMContentLoaded', () => {
  const savedLanguage = localStorage.getItem('language');
  
  if (savedLanguage) {
    currentLanguage = savedLanguage;
    updateTexts();
  }
});

// пример использования: при клике на кнопку с id "lang-en" меняем язык на английский
document.getElementById('lang-en').addEventListener('click', () => {
  changeLanguage('en');
});

// пример использования: при клике на кнопку с id "lang-ru" меняем язык на русский
document.getElementById('lang-ru').addEventListener('click', () => {
  changeLanguage('ru');
});