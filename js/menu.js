const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeMenu() {
    hamburger.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// Cerrar menú al hacer click en un link
menu.querySelectorAll('.nav-link a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
