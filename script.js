// ==================== Dark Mode Toggle ====================
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Check for saved dark mode preference or default to light mode
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

// Toggle dark mode on button click
darkModeToggle.addEventListener('click', () => {
    const isCurrentlyDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isCurrentlyDark);
    darkModeToggle.textContent = isCurrentlyDark ? '☀️' : '🌙';
});

// ==================== Mobile Menu Toggle ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== Countdown Timer ====================
function updateCountdown() {
    // Set the target date for the sprint (48 hours from now as an example)
    // You can modify this to set a specific date
    const now = new Date().getTime();

    // Example: Sprint ends 48 hours from page load
    // You can change this to a specific date like: new Date('2026-07-25').getTime()
    const sprintDuration = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
    const sprintEnd = localStorage.getItem('sprintEnd') || (now + sprintDuration);
    localStorage.setItem('sprintEnd', sprintEnd);

    const countDown = parseInt(sprintEnd) - now;

    // Calculate time units
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    // Update the HTML with padded numbers
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // If countdown is finished
    if (countDown < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ==================== Get Started Button ====================
const getStartedBtn = document.getElementById('getStartedBtn');
getStartedBtn.addEventListener('click', () => {
    // Scroll to the tracks section
    const tracksSection = document.getElementById('tracks');
    tracksSection.scrollIntoView({ behavior: 'smooth' });
});

// ==================== Smooth Scrolling for Navigation Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Add Animation to Elements on Scroll ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe track cards
document.querySelectorAll('.track-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observe showcase cards
document.querySelectorAll('.showcase-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observe progress cards
document.querySelectorAll('.progress-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observe contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

// ==================== Close Mobile Menu on Scroll ====================
document.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================== Prevent Body Scroll When Mobile Menu is Open ====================
navMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================== Performance: Lazy Load Images ====================
// This can be extended if you add images to the website
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== Console Welcome Message ====================
console.log(
    '%c🐼 Welcome to BlackPanda Labs Sprint Command Center!',
    'font-size: 20px; font-weight: bold; color: #0077ff;'
);
console.log(
    '%cLet\'s build something amazing in the next 48 hours! 🚀',
    'font-size: 14px; color: #00d4ff;'
);

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    // Any additional initialization can be done here
    console.log('Page initialized successfully!');
});
