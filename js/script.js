window.addEventListener('scroll', reveal);
window.addEventListener('scroll', scrollProgress);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const revealPoint = 150;
    const windowHeight = window.innerHeight;

    reveals.forEach(element => {
        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Esegui una volta al caricamento per mostrare la Hero
document.addEventListener("DOMContentLoaded", reveal);

// Effetto Parallasse Mouse per i Blob (disattivato se l'utente preferisce meno animazioni)
if (!reduceMotion) {
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.blob');

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20; // Velocità diversa per ogni blob
            const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
            const yOffset = (window.innerHeight / 2 - e.clientY) / speed;

            blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

// Accordion FAQ
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
        item.classList.toggle('active');
        const content = item.querySelector('.accordion-content');
        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = 0;
        }
    });
});

// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

function setMenu(open) {
    nav.classList.toggle('nav-active', open);
    burger.classList.toggle('toggle', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Chiudi il menù' : 'Apri il menù');
}

burger.addEventListener('click', () => {
    setMenu(!nav.classList.contains('nav-active'));
});

// Chiudi menu quando si clicca un link
navLinks.forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500); // Aspetta che finisca la transizione di opacità
});

// Scroll Progress Bar Logic
function scrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    document.getElementById("myBar").style.width = scrolled + "%";
}

// Gestione Invio Email (Mailto)
const emailForm = document.getElementById('emailForm');
if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = this.querySelector('input[name="nome"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const messaggio = this.querySelector('textarea[name="messaggio"]').value.trim();

        const destinatario = "ostetrica.giudittamontella@gmail.com";
        const oggetto = `Richiesta dal sito web da ${nome}`;
        const corpo = `Nome: ${nome}\r\nEmail: ${email}\r\n\r\nMessaggio:\r\n${messaggio}`;

        window.location.href = `mailto:${destinatario}?subject=${encodeURIComponent(oggetto)}&body=${encodeURIComponent(corpo)}`;
    });
}
