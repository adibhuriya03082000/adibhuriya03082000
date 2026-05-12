// ===================================
// PKN MOTORS - JAVASCRIPT
// Optimized and Clean Code
// ===================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('PKN Motors Website Loaded');
    
    // Initialize all features
    initializeNavigation();
    initializeContactForm();
    initializeScrollEffects();
    initializeTooltips();
});

// ===================================
// NAVIGATION FUNCTIONS
// ===================================

/**
 * Initialize navigation functionality
 * Handles active link highlighting based on current page
 */
function initializeNavigation() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navbar-nav a');
    
    // Loop through links and set active class if it matches current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check if link matches current page
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
            // Remove active class from siblings
            link.parentElement.siblings?.forEach(sibling => {
                sibling.querySelector('a')?.classList.remove('active');
            });
        }
    });
    
    // Close navbar when a link is clicked (mobile)
    const navbarLinks = document.querySelectorAll('.navbar-collapse a');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Only close if navbar is visible (mobile view)
            if (window.innerWidth < 992) {
                navbarToggler?.click();
            }
        });
    });
}

// ===================================
// CONTACT FORM FUNCTIONS
// ===================================

/**
 * Initialize contact form functionality
 * Handles form submission and validation
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const phone = document.getElementById('phone')?.value;
            const subject = document.getElementById('subject')?.value;
            const message = document.getElementById('message')?.value;
            
            // Validate form fields
            if (!validateForm(name, email, phone, subject, message)) {
                console.error('Form validation failed');
                return;
            }
            
            // Create form data object
            const formData = {
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
                timestamp: new Date().toISOString()
            };
            
            // Log form data (In production, send to server)
            console.log('Form Submitted:', formData);
            
            // Show success message
            showNotification('Message sent successfully! We will contact you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Optional: Send to server using fetch API
            // sendFormToServer(formData);
        });
    }
}

/**
 * Validate contact form inputs
 * @param {string} name - Full name
 * @param {string} email - Email address
 * @param {string} phone - Phone number
 * @param {string} subject - Message subject
 * @param {string} message - Message content
 * @returns {boolean} - True if valid, false otherwise
 */
function validateForm(name, email, phone, subject, message) {
    // Check if all fields are filled
    if (!name || !email || !phone || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Validate phone format (basic check)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return false;
    }
    
    // Validate message length
    if (message.length < 10) {
        showNotification('Message must be at least 10 characters long', 'error');
        return false;
    }
    
    return true;
}

/**
 * Show notification message to user
 * @param {string} message - Message text to display
 * @param {string} type - Type of notification ('success', 'error', 'warning', 'info')
 * @param {number} duration - Duration in milliseconds (default: 5000)
 */
function showNotification(message, type = 'info', duration = 5000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    notification.setAttribute('role', 'alert');
    notification.innerHTML = `
        <strong>${type.charAt(0).toUpperCase() + type.slice(1)}!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to body
    document.body.insertBefore(notification, document.body.firstChild);
    
    // Auto-remove after duration
    setTimeout(() => {
        notification.remove();
    }, duration);
}

/**
 * Send form data to server (optional)
 * @param {object} formData - Form data to send
 */
function sendFormToServer(formData) {
    // Using fetch API to send data
    fetch('api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
        showNotification('Message sent successfully!', 'success');
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Error sending message. Please try again.', 'error');
    });
}

// ===================================
// SCROLL EFFECTS FUNCTIONS
// ===================================

/**
 * Initialize scroll effects
 * Handles animations and effects on scroll
 */
function initializeScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        // Add background when scrolled
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
    
    // Fade in elements on scroll
    observeElements();
}

/**
 * Observe elements and fade them in when visible
 * Uses Intersection Observer API
 */
function observeElements() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        console.warn('Intersection Observer not supported');
        return;
    }
    
    // Create observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Create observer callback
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Create observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.card, .feature-card, .stat-box, .contact-info-box').forEach(element => {
        observer.observe(element);
    });
}

// ===================================
// TOOLTIP INITIALIZATION
// ===================================

/**
 * Initialize Bootstrap tooltips
 * Uncomment if using tooltips in your HTML
 */
function initializeTooltips() {
    // Get all tooltip elements
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    
    // Initialize tooltips
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector of target element
 */
function smoothScroll(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Debounce function - delays function execution
 * Useful for resize/scroll events
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Get query parameter from URL
 * @param {string} param - Parameter name
 * @returns {string|null} - Parameter value or null
 */
function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Local storage helper functions
 */
const StorageHelper = {
    /**
     * Save data to local storage
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     */
    set: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    /**
     * Get data from local storage
     * @param {string} key - Storage key
     * @returns {*} - Retrieved value or null
     */
    get: function(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    
    /**
     * Remove data from local storage
     * @param {string} key - Storage key
     */
    remove: function(key) {
        localStorage.removeItem(key);
    },
    
    /**
     * Clear all local storage
     */
    clear: function() {
        localStorage.clear();
    }
};

// ===================================
// CONSOLE GREETING
// ===================================

// Welcome message in console
console.log('%cWelcome to PKN Motors!', 'font-size: 20px; font-weight: bold; color: #007bff;');
console.log('%cFor support, contact us at: info@pkn-motors.com', 'font-size: 12px; color: #666;');
