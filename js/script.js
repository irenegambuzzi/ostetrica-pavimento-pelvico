// Avviso pausa maternità: metti false per spegnerlo al rientro
const AVVISO_MATERNITA = true;

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

// Avviso maternità: si apre alla prima visita, poi resta raggiungibile dall'etichetta nella hero
const noticeDialog = document.getElementById('noticeDialog');
const noticePill = document.querySelector('[data-open-notice]');
const NOTICE_KEY = 'avviso-maternita-visto';

function noticeSeen() {
    try { return localStorage.getItem(NOTICE_KEY) === '1'; } catch (e) { return false; }
}

function rememberNotice() {
    try { localStorage.setItem(NOTICE_KEY, '1'); } catch (e) { /* navigazione privata: pazienza */ }
}

function openNotice() {
    if (noticeDialog && typeof noticeDialog.showModal === 'function' && !noticeDialog.open) {
        noticeDialog.showModal();
    }
}

function closeNotice() {
    if (noticeDialog && noticeDialog.open) noticeDialog.close();
}

if (!AVVISO_MATERNITA || !noticeDialog || typeof noticeDialog.showModal !== 'function') {
    if (noticePill) noticePill.remove();
    if (noticeDialog && !AVVISO_MATERNITA) noticeDialog.remove();
} else {
    noticeDialog.addEventListener('close', rememberNotice);

    document.querySelectorAll('[data-close-notice]').forEach(btn => {
        btn.addEventListener('click', closeNotice);
    });

    // Clic fuori dalla finestra = chiudi
    noticeDialog.addEventListener('click', (e) => {
        const r = noticeDialog.getBoundingClientRect();
        const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        if (!inside) closeNotice();
    });

    if (noticePill) noticePill.addEventListener('click', openNotice);

    if (!noticeSeen()) {
        setTimeout(openNotice, reduceMotion ? 300 : 1600);
    }
}
