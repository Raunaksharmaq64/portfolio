/* =========================================
   1. DOM Elements & Constants
   ========================================= */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const popupOverlay = document.getElementById('welcome-popup');
const visitorNameInput = document.getElementById('visitor-name');
const submitNameBtn = document.getElementById('submit-name-btn');
const welcomeMessage = document.getElementById('welcome-message');
const greetingText = document.getElementById('greeting-text');
const dynamicText = document.querySelector('.dynamic-text');
const navLinks = document.querySelectorAll('.navbar a');
const header = document.querySelector('.header');

// Skills used for typing animation
const skills = [
    "Java Developer",
    "Full Stack Learner",
    "Problem Solver",
    "Hard Worker",
    "Tech Enthusiast",
    "SQL + JDBC Developer",
    "DSA Learner"
];

/* =========================================
   2. Greeting System (Time Based)
   ========================================= */
function setGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good Morning ☀️';

    if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon 🌤️';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good Evening 🌆';
    } else if (hour >= 21 || hour < 5) {
        greeting = 'Good Night 🌙';
    }

    greetingText.textContent = greeting;
}

/* =========================================
   3. Typing Animation
   ========================================= */
let skillIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentSkill = skills[skillIndex];
    
    if (isDeleting) {
        dynamicText.textContent = currentSkill.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster deleting
    } else {
        dynamicText.textContent = currentSkill.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing
    }

    if (!isDeleting && charIndex === currentSkill.length) {
        // Finished typing word
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting word
        isDeleting = false;
        skillIndex = (skillIndex + 1) % skills.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

/* =========================================
   4. Theme Toggle (Dark/Light)
   ========================================= */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');

    // DEFAULT → DARK MODE
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        // covers: 'dark' OR null
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}


themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Switch Icon
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

/* =========================================
   5. Welcome Popup Logic
   ========================================= */
function initPopup() {
    const storedName = localStorage.getItem('visitorName');
    
    if (storedName) {
        // Name exists, just update UI
        welcomeMessage.textContent = `Welcome, ${storedName} 👋`;
    } else {
        // No name, show popup
        // Small delay for better UX
        setTimeout(() => {
            popupOverlay.classList.add('show');
        }, 500);
    }
}

submitNameBtn.addEventListener('click', () => {
    const name = visitorNameInput.value.trim();
    if (name) {
        localStorage.setItem('visitorName', name);
        welcomeMessage.textContent = `Welcome, ${name} 👋`;
        popupOverlay.classList.remove('show');
    } else {
        visitorNameInput.style.borderColor = 'red';
        setTimeout(() => visitorNameInput.style.borderColor = 'var(--border-color)', 2000);
    }
});

/* =========================================
   6. Navigation / Hamburger
   ========================================= */
hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

/* =========================================
   7. Scroll Active Link Highlight
   ========================================= */
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    // Header shadow on scroll
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
        header.style.boxShadow = "none";
    }

    // Active link logic
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

document.getElementById("sendBtn").addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = "https://forms.gle/gBnvBdZGEk4NH7z4A";
  }, 100);
});

/* =========================================
   8. Initialize All
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    setGreeting();
    typeEffect();
    initTheme();
    initPopup();
});
