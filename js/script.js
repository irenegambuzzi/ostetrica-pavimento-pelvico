const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Comparsa degli elementi durante lo scroll
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('active'));
}

// Barra di navigazione: sfondo quando si scorre, bottone "torna su"
const siteNav = document.getElementById('siteNav');
const scrollTopBtn = document.querySelector('.scroll-top');

function onScroll() {
    const y = window.scrollY;
    siteNav.classList.toggle('scrolled', y > 24);
    scrollTopBtn.classList.toggle('active', y > 600);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Accordion FAQ
document.querySelectorAll('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
        const open = item.classList.toggle('active');
        header.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
});

// Menù mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

function setMenu(open) {
    nav.classList.toggle('nav-active', open);
    burger.classList.toggle('toggle', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Chiudi il menù' : 'Apri il menù');
    document.body.style.overflow = open ? 'hidden' : '';
}

burger.addEventListener('click', () => {
    setMenu(!nav.classList.contains('nav-active'));
});

nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav-active')) {
        setMenu(false);
        burger.focus();
    }
});

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
