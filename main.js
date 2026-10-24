const toggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('theme', theme);
}
const savedTheme =
  localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

applyTheme(savedTheme);

toggleBtn.addEventListener('click', () => {
  applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
});
const typingEl = document.getElementById('typing');
const words = ['Frontend Developer', 'React Developer'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = words[wordIndex];

  if (!deleting) {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      return setTimeout(typeEffect, 1500); // يستنى شوية قبل ما يمسح
    }
    return setTimeout(typeEffect, 100);
  }

  charIndex--;
  typingEl.textContent = current.slice(0, charIndex);
  if (charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    return setTimeout(typeEffect, 400);
  }
  setTimeout(typeEffect, 50);
}

typingEl.textContent = '';
typeEffect();
// ===== Form validation =====
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

const rules = {
  name: {
    test: v => /^[A-Za-z\u0600-\u06FF]+(?:[ '-][A-Za-z\u0600-\u06FF]+)*$/.test(v) && v.length >= 3,
    msg: 'Please enter a valid name (letters only, at least 3 characters)'
  },
  email: {
    test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
    msg: 'Please enter a valid email, e.g. name@example.com'
  },
  message: {
    test: v => v.length >= 10 && v.length <= 1000,
    msg: 'Message must be between 10 and 1000 characters'
  }
};

function validateField(input) {
  const rule = rules[input.name];
  if (!rule) return true;
  const value = input.value.trim();
  const errorEl = input.parentElement.querySelector('.error-msg');
  const ok = rule.test(value);

  input.classList.toggle('is-invalid', !ok);
  input.classList.toggle('is-valid', ok);
  errorEl.textContent = ok ? '' : rule.msg;
  return ok;
}

form.querySelectorAll('input[name], textarea').forEach(input => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.classList.contains('is-invalid')) validateField(input);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fields = [...form.querySelectorAll('#name, #email, #message')];
  const allValid = fields.map(validateField).every(Boolean);

  if (allValid) {
    statusEl.textContent = 'Looks good!';
    statusEl.className = 'mt-3 mb-0 status-success';
    form.reset();
    fields.forEach(f => f.classList.remove('is-valid', 'is-invalid'));
  } else {
    statusEl.textContent = '';
  }
});