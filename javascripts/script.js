// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Dark/Light Mode Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update button icon
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
});

// Check for saved theme preference
const savedDarkMode = localStorage.getItem('darkMode') === 'true';
if (savedDarkMode) {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Time-based Greeting
function setGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.getElementById('greeting');
    
    if (greetingElement) {
        if (hour < 12) {
            greetingElement.textContent = 'Good Morning!';
        } else if (hour < 18) {
            greetingElement.textContent = 'Good Afternoon!';
        } else {
            greetingElement.textContent = 'Good Evening!';
        }
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setGreeting();
    
    // Add active class to current page link
    const currentPage = location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href').replace('.html', '');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// Form Validation for Contact Page
if (document.getElementById('contactForm')) {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            document.getElementById('name-error').textContent = 'Name is required';
            isValid = false;
        }
        
        // Email validation
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            document.getElementById('email-error').textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        // Phone validation (optional but must be valid if provided)
        const phone = document.getElementById('phone');
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (phone.value.trim() && !phoneRegex.test(phone.value)) {
            document.getElementById('phone-error').textContent = 'Please use format: 123-456-7890';
            isValid = false;
        }
        
        // Subject validation
        const subject = document.getElementById('subject');
        if (!subject.value) {
            document.getElementById('subject-error').textContent = 'Please select a subject';
            isValid = false;
        }
        
        // Message validation
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            document.getElementById('message-error').textContent = 'Message is required';
            isValid = false;
        }
        
        if (isValid) {
            // Form is valid - you would typically send the data to a server here
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        }
    });
}

// Form Validation for Survey Page
if (document.getElementById('surveyForm')) {
    const surveyForm = document.getElementById('surveyForm');
    
    surveyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate required fields
        const designRating = document.querySelector('input[name="design-rating"]:checked');
        const recommend = document.querySelector('input[name="recommend"]:checked');
        
        if (!designRating || !recommend) {
            alert('Please answer all required questions.');
            return;
        }
        
        // Form is valid - you would typically send the data to a server here
        alert('Thank you for your feedback! Your responses have been submitted.');
        this.reset();
    });
}

// Project Details Toggle
function toggleDetails(id) {
    const details = document.getElementById(id);
    if (details.style.display === "none") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}