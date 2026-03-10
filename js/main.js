// Theme Toggle con localStorage y prefers-color-scheme
const themeToggleDesktop = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const root = document.documentElement;

function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
    if (theme === 'light') {
        root.setAttribute('data-theme', 'light');
    } else {
        root.removeAttribute('data-theme');
    }
}

function toggleTheme() {
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
}

applyTheme(getPreferredTheme());

themeToggleDesktop.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// Active Nav Link on Scroll con IntersectionObserver
const sections = document.querySelectorAll('main[id], section[id], #Habilidades');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                const href = link.querySelector('a').getAttribute('href');
                if (href === '#' + id) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
}, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

sections.forEach(section => navObserver.observe(section));

// Fade-in on Scroll con IntersectionObserver
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px 0px -100px 0px', threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Typing Effect
const typingText = document.getElementById('typing-text');
const phrases = ['Desarrollador Full Stack', 'Full Stack Developer','Développeur Full Stack'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === current.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// Form Validation
const form = document.querySelector('.contacto-form');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const mensaje = document.getElementById('mensaje');

function validateField(input, errorId, validationFn) {
    const error = document.getElementById(errorId);
    const value = input.value.trim();

    if (validationFn(value)) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        error.classList.remove('show');
        return true;
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        error.classList.add('show');
        return false;
    }
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

nombre.addEventListener('blur', () => {
    validateField(nombre, 'nombre-error', v => v.length > 0);
});

email.addEventListener('blur', () => {
    validateField(email, 'email-error', isValidEmail);
});

mensaje.addEventListener('blur', () => {
    validateField(mensaje, 'mensaje-error', v => v.length > 0);
});

form.addEventListener('submit', (e) => {
    const isNombreValid = validateField(nombre, 'nombre-error', v => v.length > 0);
    const isEmailValid = validateField(email, 'email-error', isValidEmail);
    const isMensajeValid = validateField(mensaje, 'mensaje-error', v => v.length > 0);

    if (!isNombreValid || !isEmailValid || !isMensajeValid) {
        e.preventDefault();
    }
});
