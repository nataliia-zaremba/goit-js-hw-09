// 1. Об’єкт formData з порожніми значеннями
let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const STORAGE_KEY = 'feedback-form-state';

// 2. Перевірка localStorage при завантаженні
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsed = JSON.parse(savedData);
    formData = parsed;

    emailInput.value = parsed.email || '';
    messageInput.value = parsed.message || '';
  } catch (e) {
    console.error('Invalid saved form data:', e);
  }
}

// 3. Відстеження input — делегування
form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// 4. Submit — перевірка і очищення
form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted:', formData);

  // Очищення
  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
