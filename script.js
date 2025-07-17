// Calculate dynamic experience
function calculateExperience() {
    const joinDate = new Date("2023-01-01"); // Your joining date at Bosch
    const currentDate = new Date();

    const diffTime = Math.abs(currentDate.getTime() - joinDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years === 0) {
        return `${months} months`;
    } else if (years === 1 && months === 0) {
        return `1 year`;
    } else if (years === 1) {
        return `1 year ${months} months`;
    } else if (months === 0) {
        return `${years} years`;
    } else {
        return `${years} years ${months} months`;
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update active navigation item
function updateActiveNavigation() {
    const sections = ['hero', 'about', 'experience', 'current-projects', 'projects', 'skills', 'education', 'contact'];
    const scrollPosition = window.scrollY + 100;
    
    let activeSection = 'hero';
    
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                activeSection = section;
                break;
            }
        }
    }
    
    // Update navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        const sectionName = item.textContent.toLowerCase().replace(' ', '-');
        if (sectionName === activeSection || 
            (activeSection === 'current-projects' && sectionName === 'current-projects')) {
            item.classList.add('active');
        }
    });
}

// Populate technical skills
function populateTechnicalSkills() {
    const skills = [
        "Android Development", "Kotlin", "Kotlin Coroutines", "Java", "Google Maps SDK",
        "Room Database", "Retrofit", "Bluetooth Low Energy", "WiFi Integration", "UDP Protocol",
        "Metadata Processing", "IoT Solutions", "Automotive Software", "Python", "Machine Learning",
        "Computer Vision", "YOLO", "Scikit-Learn", "UiPath RPA", "JavaScript", "Bootstrap",
        "MySQL", "HTML/CSS", "JDBC", "Arduino", "Networking", "Mobile App Development"
    ];
    
    const technicalSkillsContainer = document.getElementById('technical-skills');
    
    skills.forEach(skill => {
        const skillElement = document.createElement('span');
        skillElement.className = 'technical-skill';
        skillElement.textContent = skill;
        technicalSkillsContainer.appendChild(skillElement);
    });
}

// Initialize the page
function initializePage() {
    // Update experience text
    const experienceText = calculateExperience();
    document.getElementById('experience-text').textContent = experienceText;
    document.getElementById('experience-text-2').textContent = experienceText;
    
    // Populate technical skills
    populateTechnicalSkills();
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Initial navigation update
    updateActiveNavigation();
    
    // Add mobile menu toggle functionality (if needed)
    const navMenu = document.querySelector('.nav-menu');
    const navBrand = document.querySelector('.nav-brand');
    
    // Mobile menu toggle (you can add a hamburger button if needed)
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
    }
}

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for animation
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Handle mobile responsiveness
function handleMobileMenu() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Close mobile menu after clicking (if you implement mobile menu)
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupAnimations();
    handleMobileMenu();
});

// Handle window resize
window.addEventListener('resize', function() {
    updateActiveNavigation();
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Utility function to open external links
function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Add smooth reveal animation for sections
function addSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}

// Add CSS for section animations
const sectionAnimationCSS = `
.section-hidden {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.section-visible {
    opacity: 1;
    transform: translateY(0);
}
`;

// Inject section animation CSS
const style = document.createElement('style');
style.textContent = sectionAnimationCSS;
document.head.appendChild(style);

// Initialize section animations
document.addEventListener('DOMContentLoaded', function() {
    addSectionAnimations();
});

function showResumePopup() {
    document.getElementById('resumePopup').style.display = 'block';
}

function closeResumePopup() {
    document.getElementById('resumePopup').style.display = 'none';
}
