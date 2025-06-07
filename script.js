// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or use the user's system preference
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply the theme to the document
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update the icon
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Initialize theme
const initialTheme = getPreferredTheme();
applyTheme(initialTheme);

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle between hamburger and close icons
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Scroll animation
function handleScrollAnimation() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // If section is in viewport
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

// Run on initial load
window.addEventListener('load', handleScrollAnimation);

// Run on scroll
window.addEventListener('scroll', handleScrollAnimation);

// Smooth scrolling for navigation links
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

// Handle form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the form data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', formData);
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll animation for paragraphs
function handleParagraphAnimations() {
    const paragraphs = document.querySelectorAll('.about-text, .project-content p, .contact-content p');
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight * 0.8;

    paragraphs.forEach(paragraph => {
        const paragraphTop = paragraph.getBoundingClientRect().top;
        
        // Only add the visible class, never remove it
        if (paragraphTop < triggerBottom) {
            paragraph.classList.add('visible');
        }
    });
}

// Run on initial load
window.addEventListener('load', () => {
    handleParagraphAnimations();
});

// Run on scroll with debounce for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        handleParagraphAnimations();
    }, 50);
});

// Hexagon Grid Animation
let lastMouseX = 0;
let lastMouseY = 0;
let hexagonCount = 0;
const maxHexagons = 10;
const hexagons = [];
let mouseMoveTimeout;

function createHexagon() {
    const grid = document.querySelector('.hexagon-grid');
    const hexagon = document.createElement('div');
    hexagon.className = 'hexagon';
    grid.appendChild(hexagon);
    return hexagon;
}

// Mouse move effect
function handleMouseMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Clear any existing timeout
    clearTimeout(mouseMoveTimeout);
    
    // Only create new hexagon if mouse has moved a certain distance
    const distance = Math.sqrt(
        Math.pow(mouseX - lastMouseX, 2) + 
        Math.pow(mouseY - lastMouseY, 2)
    );
    
    if (distance > 20) { // Minimum distance between hexagons
        const hexagon = createHexagon();
        hexagon.style.left = `${mouseX - 10}px`; // Center the hexagon horizontally
        hexagon.style.top = `${mouseY - 5.77}px`; // Center the hexagon vertically
        hexagon.classList.add('visible');
        
        // Add to array and remove oldest if needed
        hexagons.push(hexagon);
        if (hexagons.length > maxHexagons) {
            const oldestHexagon = hexagons.shift();
            oldestHexagon.classList.add('fade-out');
            setTimeout(() => oldestHexagon.remove(), 500);
        }
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }

    // Set timeout to fade out all hexagons when mouse stops moving
    mouseMoveTimeout = setTimeout(() => {
        hexagons.forEach(hexagon => {
            hexagon.classList.add('fade-out');
            setTimeout(() => hexagon.remove(), 500);
        });
        hexagons.length = 0; // Clear the array
    }, 100); // Fade out after 100ms of no movement
}

// Initialize hexagon trail
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mousemove', handleMouseMove);
});

// Shooting Star Animation
function createShootingStar() {
    const homeSection = document.querySelector('#home');
    const star = document.createElement('div');
    const tail = document.createElement('div');
    
    star.className = 'shooting-star';
    tail.className = 'shooting-tail';
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Adjust start position based on screen size
    const startX = Math.random() * viewportWidth;
    const startY = Math.random() * (viewportHeight * 0.4); // Reduced height range for mobile
    
    // Random angle between 180 and 250 degrees
    const angle = Math.random() * 70 + 180;
    star.style.setProperty('--angle', `${angle}deg`);
    tail.style.setProperty('--angle', `${angle}deg`);
    
    // Adjust size variation based on screen size
    const isMobile = viewportWidth <= 768;
    const size = isMobile ? 
        (Math.random() * 0.2 + 0.8) : // Smaller size range for mobile
        (Math.random() * 0.3 + 0.85); // Original size range for desktop
    star.style.transform = `scale(${size})`;
    tail.style.transform = `scale(${size})`;
    
    // Adjust speed based on screen size
    const duration = isMobile ?
        (Math.random() * 1.5 + 3) : // Faster for mobile
        (Math.random() * 2 + 4); // Original speed for desktop
    star.style.animationDuration = `${duration}s`;
    tail.style.animationDuration = `${duration}s`;
    
    // Set initial position
    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;
    tail.style.left = `${startX}px`;
    tail.style.top = `${startY}px`;
    
    // Add both elements to the DOM
    homeSection.appendChild(star);
    homeSection.appendChild(tail);
    
    // Force a reflow to ensure the animation starts
    star.offsetHeight;
    tail.offsetHeight;
    
    // Remove both elements after animation completes
    setTimeout(() => {
        star.remove();
        tail.remove();
        // Create the next star after this one finishes
        const nextStarDelay = isMobile ? 1500 : 2000; // Shorter delay for mobile
        setTimeout(createShootingStar, nextStarDelay);
    }, duration * 1000);
}

// Start the shooting stars when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createShootingStar(); // Start with one star
}); 