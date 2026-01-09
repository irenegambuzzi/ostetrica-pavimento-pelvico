window.addEventListener('scroll', reveal);
window.addEventListener('scroll', scrollProgress); // Aggiunto listener per progress bar

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
document.addEventListener("DOMContentLoaded", function() {
    reveal();
    checkCookies();
});

// Effetto Parallasse Mouse per i Blob
document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.blob');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20; // Velocità diversa per ogni blob
        const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
        const yOffset = (window.innerHeight / 2 - e.clientY) / speed;
        
        blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

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

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Chiudi menu quando si clicca un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// Animazione Numeri (Counters)
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !hasAnimated) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100; // Velocità
            
            const updateCounter = () => {
                const c = +counter.innerText;
                if (c < target) {
                    counter.innerText = Math.ceil(c + increment);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
        hasAnimated = true;
    }
});

// Cookie Banner Logic
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies');

function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000); // Appare dopo 2 secondi
    }
}

acceptBtn.addEventListener('click', () => {
    cookieBanner.classList.remove('show');
    localStorage.setItem('cookiesAccepted', 'true');
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
    // Nascondi il preloader
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500); // Aspetta che finisca la transizione di opacità
});

// Scroll Progress Bar Logic
function scrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

// Gestione Invio Email (Mailto)
const emailForm = document.getElementById('emailForm');
if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = this.querySelector('input[name="nome"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const messaggio = this.querySelector('textarea[name="messaggio"]').value;
        
        // INSERISCI QUI SOTTO L'EMAIL REALE DOVE VUOI RICEVERE I MESSAGGI
        const destinatario = "Ostetrica.giudittamontella@gmail.com"; 
        const oggetto = `Richiesta dal sito web da ${nome}`;
        const corpo = `Nome: ${nome}%0D%0AEmail: ${email}%0D%0A%0D%0AMessaggio:%0D%0A${messaggio}`;
        
        window.location.href = `mailto:${destinatario}?subject=${oggetto}&body=${corpo}`;
    });
}