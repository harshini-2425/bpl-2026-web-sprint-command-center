/* ==================== Loading Screen Fadeout ==================== */
// Hide loading screen after 2 seconds
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // Loading screen will fade out automatically due to CSS animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 2400); // Match CSS animation duration
    }
});

/* ==================== Scroll Progress Bar ==================== */
const scrollProgressBar = document.getElementById('scrollProgressBar');

window.addEventListener('scroll', () => {
    // Calculate scroll percentage
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgressBar.style.width = scrolled + '%';
});

/* ==================== Dark Mode Toggle ==================== */
const darkModeToggle = document.getElementById('darkModeToggle');

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

/* ==================== Mobile Menu Toggle ==================== */
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

// Close mobile menu when scrolling
document.addEventListener('scroll', () => {
    if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ==================== Active Navigation Link Highlighting ==================== */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;

    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Add active class to the current section's link
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

/* ==================== Typing Animation for Hero Title ==================== */
const typingTitle = document.getElementById('typingTitle');
const textToType = 'Sprint Command Center';
let charIndex = 0;

function typeTitle() {
    if (charIndex < textToType.length) {
        typingTitle.textContent = textToType.substring(0, charIndex + 1);
        typingTitle.classList.add('typing');
        charIndex++;
        setTimeout(typeTitle, 100);
    } else {
        typingTitle.classList.remove('typing');
    }
}

// Start typing animation after page loads
document.addEventListener('DOMContentLoaded', () => {
    typingTitle.textContent = '';
    charIndex = 0;
    typeTitle();
});

/* ==================== Countdown Timer ==================== */
function updateCountdown() {
    // Get current time
    const now = new Date().getTime();

    // Sprint duration: 48 hours from page load
    const sprintDuration = 48 * 60 * 60 * 1000;
    const sprintEnd = localStorage.getItem('sprintEnd') || (now + sprintDuration);
    localStorage.setItem('sprintEnd', sprintEnd);

    // Calculate remaining time
    const countDown = parseInt(sprintEnd) - now;

    // Calculate time units
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    // Update HTML with padded numbers
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

    // If countdown is finished
    if (countDown < 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
    }
}

// Update countdown immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);

/* ==================== FAQ Accordion ==================== */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

/* ==================== Smooth Scrolling for Navigation Links ==================== */
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

/* ==================== Button Event Listeners ==================== */
const getStartedBtn = document.getElementById('getStartedBtn');
const learnMoreBtn = document.getElementById('learnMoreBtn');

if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
        const tracksSection = document.getElementById('tracks');
        tracksSection.scrollIntoView({ behavior: 'smooth' });
    });
}

if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
        const statsSection = document.querySelector('.stats-section');
        statsSection.scrollIntoView({ behavior: 'smooth' });
    });
}

/* ==================== Back to Top Button ==================== */
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ==================== Scroll Animations with Intersection Observer ==================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const elementsToObserve = [
    '.track-card',
    '.progress-card',
    '.stat-card',
    '.showcase-card',
    '.contact-item',
    '.faq-item',
    '.leaderboard-card',
    '.announcement-card',
    '.testimonial-card'
];

elementsToObserve.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
});

/* ==================== Animated Stat Counter ==================== */
function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(element => {
        const target = parseInt(element.getAttribute('data-target')) || parseInt(element.textContent);

        if (!element.hasAttribute('data-animated')) {
            element.setAttribute('data-animated', 'true');
            let current = 0;
            const increment = Math.ceil(target / 30);

            const interval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(interval);
                } else {
                    element.textContent = current;
                }
            }, 50);
        }
    });
}

// Trigger stat animation when stats section is in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStatNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

/* ==================== Newsletter Form ==================== */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    const subscribeBtn = newsletterForm.querySelector('.btn');
    const emailInput = newsletterForm.querySelector('.newsletter-input');

    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value;

        if (email && email.includes('@')) {
            subscribeBtn.textContent = '✓ Subscribed!';
            subscribeBtn.disabled = true;
            emailInput.value = '';

            setTimeout(() => {
                subscribeBtn.textContent = 'Subscribe';
                subscribeBtn.disabled = false;
            }, 3000);
        } else {
            alert('Please enter a valid email address');
        }
    });
}

/* ==================== Lazy Loading for Images ==================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ==================== Keyboard Navigation ==================== */
// Close FAQ accordion with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        faqItems.forEach(item => {
            item.classList.remove('active');
        });
    }
});

/* ==================== Prevent Body Scroll When Mobile Menu is Open ==================== */
navMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ==================== Enhanced Hover Effects ==================== */
// Add subtle interaction feedback
document.querySelectorAll('.btn, .card, .nav-link').forEach(element => {
    element.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    element.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
});

/* ==================== Console Welcome Message ==================== */
console.log('%c🐼 Welcome to BlackPanda Labs Sprint Command Center!',
    'font-size: 18px; font-weight: bold; color: #0077ff; text-shadow: 0 0 10px rgba(0,119,255,0.5);');
console.log('%cLet\'s build something amazing in the next 48 hours! 🚀',
    'font-size: 14px; color: #00d4ff; font-weight: 500;');
console.log('%cVersion: 2.0 Enhanced',
    'font-size: 12px; color: #4caf50; font-weight: 500;');

/* ==================== Page Performance Check ==================== */
window.addEventListener('load', () => {
    // Log page load time
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`✓ Page loaded in ${pageLoadTime}ms`);
});

/* ==================== Page Load Complete ==================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Page initialized successfully!');
    console.log('✓ All features loaded: Animations, Dark Mode, Interactions');
});
