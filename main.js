// Update the footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const bars = document.querySelectorAll('.bar');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Simple animation for hamburger
    if (navLinks.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -5px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// FAQ Accordion Toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const icon = item.querySelector('.faq-icon');
    const answer = item.querySelector('.faq-answer');

    if (icon) {
        icon.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent bubling
            e.preventDefault();

            // Check if current item is already active
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Loop through and toggle the clicked one
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    }
});

// Set the initial height for the item that is active by default in HTML
const activeFaq = document.querySelector('.faq-item.active .faq-answer');
if (activeFaq) {
    activeFaq.style.maxHeight = activeFaq.scrollHeight + "px";
}

// Contact Form AJAX Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const projectType = document.getElementById('projectTypeInput').value;
        const projectDetails = document.getElementById('projectDetailsInput').value;
        const importantInfo = document.getElementById('importantInfoInput').value;

        // Visual feedback during submission
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        formMessage.style.display = 'none';

        fetch("https://formsubmit.co/ajax/hellopotec@gmail.com", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                "Project Type": projectType,
                "Project Details": projectDetails,
                "Important Info": importantInfo,
                _subject: "New Website Lead for P.O TEC DIGITAL SOLUTIONS!"
            })
        })
            .then(response => response.json())
            .then(data => {
                formMessage.style.display = 'block';
                if (data.success) {
                    formMessage.style.color = '#4ade80'; // Success green
                    formMessage.textContent = 'Awesome! We received your email and will be in touch shortly.';
                    contactForm.reset();
                } else {
                    formMessage.style.color = '#f87171'; // Error red
                    formMessage.textContent = 'Oops! Something went wrong. Please try again.';
                }
            })
            .catch(error => {
                formMessage.style.display = 'block';
                formMessage.style.color = '#f87171';
                formMessage.textContent = 'Oops! Something went wrong. Please check your connection and try again.';
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}
