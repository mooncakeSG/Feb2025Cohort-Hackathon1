<<<<<<< HEAD
// Theme Management Module
const ThemeManager = {
    init() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        this.currentTheme = localStorage.getItem('theme') || 
            (this.prefersDarkScheme.matches ? 'dark' : 'light');
        
        this.setupEventListeners();
        this.applyTheme();
    },

    setupEventListeners() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    },

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.currentTheme);
    },

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    },

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        this.themeToggle.setAttribute('aria-pressed', this.currentTheme === 'dark');
    }
};

// Scroll Management Module
const ScrollManager = {
    init() {
        this.setupSmoothScroll();
        this.setupScrollAnimations();
    },

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
    },

    handleSmoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(e.currentTarget.getAttribute('href'));
        if (!target) return;

=======
// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Load saved theme from localStorage or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Update theme icon based on current theme
function updateThemeIcon() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeToggle.innerHTML = currentTheme === 'light' 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
>>>>>>> origin/main
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
<<<<<<< HEAD
    },

    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });
    }
};

// Form Management Module
const FormManager = {
    init() {
        this.form = document.querySelector('.contact-form');
        this.formGroups = this.form.querySelectorAll('.form-group');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        
        this.setupEventListeners();
    },

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) return;

        try {
            await this.submitForm();
        } catch (error) {
            this.handleError(error);
        }
    },

    validateForm() {
        let isValid = true;
        this.clearErrors();

        this.formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            if (!input.value.trim()) {
                isValid = false;
                this.showError(input, 'This field is required');
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                isValid = false;
                this.showError(input, 'Please enter a valid email address');
            }
        });

        return isValid;
    },

    async submitForm() {
        this.setLoadingState(true);

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        const response = await fetch('https://formspree.io/f/your-formspree-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        this.showSuccess('Message sent successfully!');
        this.form.reset();
    },

    setLoadingState(isLoading) {
        this.submitButton.disabled = isLoading;
        this.submitButton.textContent = isLoading ? 'Sending...' : 'Send Message';
        this.submitButton.classList.toggle('loading', isLoading);
    },

    showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorId = `${input.id}-error`;
        const error = document.getElementById(errorId) || document.createElement('div');
        
        error.id = errorId;
        error.className = 'error';
        error.textContent = message;
        error.setAttribute('role', 'alert');
        
        if (!document.getElementById(errorId)) {
            formGroup.appendChild(error);
        }
    },

    showSuccess(message) {
        const success = document.createElement('div');
        success.className = 'success';
        success.textContent = message;
        success.setAttribute('role', 'alert');
        this.form.insertBefore(success, this.submitButton);
        
        setTimeout(() => success.remove(), 3000);
    },

    clearErrors() {
        this.formGroups.forEach(group => {
            const error = group.querySelector('.error');
            if (error) error.remove();
        });
    },

    handleError(error) {
        console.error('Form submission error:', error);
        this.showError(this.submitButton, 'Failed to send message. Please try again.');
    },

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

// Image Loading Module
const ImageLoader = {
    init() {
        this.setupImageLoading();
    },

    setupImageLoading() {
        document.querySelectorAll('.project-image img').forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    }
};

// Blog Management Module
const BlogManager = {
    init() {
        this.blogGrid = document.querySelector('.blog-grid');
        this.loadMoreButton = document.getElementById('load-more-posts');
        this.currentPage = 1;
        this.postsPerPage = 4;
        this.allPosts = [];
        
        this.setupEventListeners();
        this.loadInitialPosts();
    },

    setupEventListeners() {
        this.loadMoreButton.addEventListener('click', () => this.loadMorePosts());
        
        // Intersection Observer for fade-in animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });

        document.querySelectorAll('.blog-card').forEach(card => {
            observer.observe(card);
        });
    },

    async loadInitialPosts() {
        try {
            // In a real application, this would fetch from an API
            this.allPosts = this.getMockPosts();
            this.renderPosts(this.allPosts.slice(0, this.postsPerPage));
            this.updateLoadMoreButton();
        } catch (error) {
            console.error('Error loading initial posts:', error);
            this.showError('Failed to load blog posts. Please try again later.');
        }
    },

    async loadMorePosts() {
        try {
            this.currentPage++;
            const startIndex = (this.currentPage - 1) * this.postsPerPage;
            const endIndex = startIndex + this.postsPerPage;
            const newPosts = this.allPosts.slice(startIndex, endIndex);
            
            if (newPosts.length > 0) {
                this.renderPosts(newPosts, true);
                this.updateLoadMoreButton();
            } else {
                this.loadMoreButton.style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading more posts:', error);
            this.showError('Failed to load more posts. Please try again later.');
        }
    },

    renderPosts(posts, append = false) {
        if (!append) {
            this.blogGrid.innerHTML = '';
        }

        posts.forEach(post => {
            const card = this.createBlogCard(post);
            this.blogGrid.appendChild(card);
        });
    },

    createBlogCard(post) {
        const article = document.createElement('article');
        article.className = 'blog-card';
        
        article.innerHTML = `
            <div class="blog-card-content">
                <h3>${post.title}</h3>
                <p class="blog-date">${post.date}</p>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${post.url}" class="btn btn-primary" aria-label="Read ${post.title}">
                    Read More
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                </a>
            </div>
        `;

        return article;
    },

    updateLoadMoreButton() {
        const remainingPosts = this.allPosts.length - (this.currentPage * this.postsPerPage);
        this.loadMoreButton.style.display = remainingPosts > 0 ? 'inline-flex' : 'none';
    },

    showError(message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.setAttribute('role', 'alert');
        this.blogGrid.insertBefore(error, this.loadMoreButton);
        
        setTimeout(() => error.remove(), 5000);
    },

    getMockPosts() {
        return [
            {
                title: "Mastering API Security: A Beginner's Guide",
                date: "March 28, 2024",
                excerpt: "Learn the fundamentals of API security, from authentication to rate limiting, and discover best practices for protecting your endpoints.",
                tags: ["Security", "API", "Web Development"],
                url: "#"
            },
            {
                title: "The Role of AI in Cybersecurity",
                date: "March 25, 2024",
                excerpt: "Explore how artificial intelligence is revolutionizing cybersecurity, from threat detection to automated response systems.",
                tags: ["AI", "Cybersecurity", "Technology"],
                url: "#"
            },
            {
                title: "From Poetry to Programming: My Journey into Tech",
                date: "March 20, 2024",
                excerpt: "A personal story about how my passion for creative writing led me to discover the intersection of art and technology.",
                tags: ["Personal", "Career", "Writing"],
                url: "#"
            },
            {
                title: "Scaling Web Apps: Performance & Security",
                date: "March 18, 2024",
                excerpt: "Discover strategies for building scalable web applications while maintaining robust security measures.",
                tags: ["Performance", "Security", "Web Development"],
                url: "#"
            },
            {
                title: "The Future of Cloud Security",
                date: "March 15, 2024",
                excerpt: "An exploration of emerging trends in cloud security and how they're shaping the future of digital infrastructure.",
                tags: ["Cloud", "Security", "Future Tech"],
                url: "#"
            },
            {
                title: "Building Resilient Systems",
                date: "March 12, 2024",
                excerpt: "Learn about the principles of system resilience and how to implement them in your applications.",
                tags: ["Architecture", "Resilience", "Best Practices"],
                url: "#"
            }
        ];
    }
};

// Project Management Module
const ProjectManager = {
    init() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.setupAnimations();
    },

    setupAnimations() {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.projectCards.forEach(card => {
            observer.observe(card);
        });
    }
};

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    ScrollManager.init();
    FormManager.init();
    ImageLoader.init();
    BlogManager.init();
    ProjectManager.init();
=======
    });
});

// Scroll Animation
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
const formGroups = contactForm.querySelectorAll('.form-group');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    formGroups.forEach(group => {
        const error = group.querySelector('.error');
        if (error) error.remove();
    });

    // Validate each field
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            isValid = false;
            showError(input, 'Please enter a valid email address');
        }
    });

    if (isValid) {
        try {
            // Add loading state
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Submit form to Formspree
            const response = await fetch('https://formspree.io/f/your-formspree-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                })
            });

            if (response.ok) {
                showSuccess('Message sent successfully!');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showError(submitButton, 'Failed to send message. Please try again.');
        } finally {
            // Remove loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    }
});

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = message;
    formGroup.appendChild(error);
}

function showSuccess(message) {
    const success = document.createElement('div');
    success.className = 'success';
    success.textContent = message;
    contactForm.insertBefore(success, submitButton);
    setTimeout(() => success.remove(), 3000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add loading animation to project images
document.querySelectorAll('.project-image img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
>>>>>>> origin/main
}); 