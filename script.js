// DOM Elements - Initialize after DOM is loaded
let homeScreen, servicesPage, startBtn, backToHomeBtn, serviceCards;
let navbar, navLinks, sections;
let authModal, signInForm, signUpForm, showSignUpBtn, showSignInBtn;
let authCloseBtn, loginForm, registerForm, sendOTPBtn, sendRegOTPBtn;
let demoModal, demoBtn, demoCloseBtn, demoVideo;
let complaintModal, complaintForm, complaintCloseBtn, complaintSuccess;
let lostFoundModal, lostFoundCloseBtn, lostFoundSuccess;

function initializeDemoModal() {
    demoModal = document.getElementById('demoModal');
    demoBtn = document.getElementById('demoBtn');
    demoCloseBtn = demoModal ? demoModal.querySelector('.demo-close-btn') : null;
    demoVideo = document.getElementById('demoVideo');

    if (demoBtn && demoModal && demoVideo) {
        demoBtn.addEventListener('click', function () {
            demoModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            // Load and play the local video
            try {
                demoVideo.load(); // Reload video sources
                demoVideo.currentTime = 0; // Reset to beginning

                // Attempt to play the video (handle autoplay restrictions)
                const playPromise = demoVideo.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log('Autoplay prevented:', error);
                        // Video will be ready to play when user clicks play button
                    });
                }
            } catch (error) {
                console.error('Error loading video:', error);
                showVideoError();
            }
        });
    }

    if (demoCloseBtn && demoModal && demoVideo) {
        demoCloseBtn.addEventListener('click', function () {
            closeDemoModal();
        });
    }

    // Close modal when clicking outside content
    if (demoModal) {
        demoModal.addEventListener('click', function (event) {
            if (event.target === demoModal) {
                closeDemoModal();
            }
        });
    }

    // Handle video errors
    if (demoVideo) {
        demoVideo.addEventListener('error', function () {
            showVideoError();
        });

        demoVideo.addEventListener('loadedmetadata', function () {
            console.log('Video loaded successfully');
        });
    }
}

function closeDemoModal() {
    if (demoModal && demoVideo) {
        demoModal.classList.add('hidden');
        document.body.style.overflow = 'auto';

        // Pause and reset video
        demoVideo.pause();
        demoVideo.currentTime = 0;
    }
}

function showVideoError() {
    const videoWrapper = document.querySelector('.demo-video-wrapper');
    if (videoWrapper) {
        videoWrapper.innerHTML = `
            <div class="video-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Video Not Available</h3>
                <p>The demo video is currently not available. Please add your demo video file to the videos folder.</p>
                <p><strong>Expected location:</strong> videos/demo-placeholder.mp4</p>
            </div>
        `;
    }
}


document.addEventListener('DOMContentLoaded', function () {

    initializeDemoModal();

});

// Initialize DOM elements
function initializeDOMElements() {
    // Main page elements
    homeScreen = document.getElementById('homeScreen');
    servicesPage = document.getElementById('servicesPage');
    startBtn = document.getElementById('startBtn');
    backToHomeBtn = document.getElementById('backToHomeBtn');
    serviceCards = document.querySelectorAll('.service-card');

    // Navigation Elements
    navbar = document.querySelector('.navbar');
    navLinks = document.querySelectorAll('.nav-link');
    sections = document.querySelectorAll('section');

    // Auth Modal Elements
    authModal = document.getElementById('authModal');
    signInForm = document.getElementById('signInForm');
    signUpForm = document.getElementById('signUpForm');
    showSignUpBtn = document.getElementById('showSignUpBtn');
    showSignInBtn = document.getElementById('showSignInBtn');
    authCloseBtn = document.querySelector('.auth-close-btn');
    loginForm = document.getElementById('loginForm');
    registerForm = document.getElementById('registerForm');
    sendOTPBtn = document.getElementById('sendOTPBtn');
    sendRegOTPBtn = document.getElementById('sendRegOTPBtn');

    // Complaint Modal Elements
    complaintModal = document.getElementById('complaintModal');
    complaintForm = document.getElementById('complaintForm');
    complaintCloseBtn = document.querySelector('.complaint-close-btn');
    complaintSuccess = document.getElementById('complaintSuccess');

    // Lost & Found Modal Elements
    lostFoundModal = document.getElementById('lostFoundModal');
    lostFoundCloseBtn = document.querySelector('.lost-found-close-btn');
    lostFoundSuccess = document.getElementById('lostFoundSuccess');
}

// Service data for future functionality
const services = {
    // 'food-delivery': {
    //     name: 'Food Delivery',
    //     description: 'Get food delivered when the mess is closed',
    //     icon: 'fas fa-utensils',
    //     color: '#ff6b6b'
    // },
    'stationery': {
        name: 'Stationery Purchase',
        description: 'Buy all your academic supplies online',
        icon: 'fas fa-pencil-alt',
        color: '#4ecdc4'
    },
    // 'syllabus': {
    //     name: 'Syllabus Download',
    //     description: 'Access course materials and syllabi',
    //     icon: 'fas fa-book',
    //     color: '#45b7d1'
    // },
    'notes': {
        name: 'Notes Sharing',
        description: 'Share and access study notes with peers',
        icon: 'fas fa-share-alt',
        color: '#96ceb4'
    },
    'papers': {
        name: 'Past Exam Papers',
        description: 'Access previous year question papers',
        icon: 'fas fa-file-alt',
        color: '#feca57'
    },
    'events': {
        name: 'Event Registration & Club Promotion',
        description: 'Centralized platform for all COEP Tech events, club activities, and B.Tech branch-specific registrations',
        icon: 'fas fa-calendar-alt',
        color: '#ff6b6b'
    },
    // 'roommate': {
    //     name: 'Roommate Finder',
    //     description: 'Find compatible roommates for your stay',
    //     icon: 'fas fa-users',
    //     color: '#54a0ff'
    // },
    // 'jobs': {
    //     name: 'Part-time Job Board',
    //     description: 'Find part-time opportunities on campus',
    //     icon: 'fas fa-briefcase',
    //     color: '#5f27cd'
    // },

    'lost-found': {
        name: 'Lost & Found',
        description: 'Report lost items or find lost belongings',
        icon: 'fas fa-search',
        color: '#ff9f43'
    },
    // 'study': {
    //     name: 'Group Study Scheduling',
    //     description: 'Organize and join study groups',
    //     icon: 'fas fa-users-cog',
    //     color: '#10ac84'
    // },
    // 'lab': {
    //     name: 'Lab Component Booking',
    //     description: 'Book laboratory equipment and components',
    //     icon: 'fas fa-flask',
    //     color: '#5f27cd'
    // },
    // 'transport': {
    //     name: 'Transport Pooling',
    //     description: 'Share rides for auto/cab services',
    //     icon: 'fas fa-car',
    //     color: '#ff6b6b'
    // },
    'complaints': {
        name: 'Complaint & Feedback',
        description: 'Submit complaints and provide feedback',
        icon: 'fas fa-comment-dots',
        color: '#feca57'
    },
    'mentorship': {
        name: 'Peer Mentorship',
        description: 'Connect with seniors for academic guidance',
        icon: 'fas fa-user-graduate',
        color: '#667eea'
    }
};

// Sample mentor data
const sampleMentors = [
    {
        id: 1,
        name: 'Arjun Sharma',
        year: 4,
        branch: 'cse',
        cgpa: 9.2,
        subjects: ['DSA', 'DBMS', 'Web Development', 'Machine Learning'],
        bio: 'Final year CSE student with expertise in full-stack development and competitive programming.',
        availability: 'Weekdays 6-8 PM, Weekends flexible'
    },
    {
        id: 2,
        name: 'Priya Patel',
        year: 3,
        branch: 'entc',
        cgpa: 8.8,
        subjects: ['Signals & Systems', 'Digital Communication', 'VLSI'],
        bio: 'Third year ENTC student passionate about signal processing and embedded systems.',
        availability: 'Evenings after 5 PM'
    },
    {
        id: 3,
        name: 'Rohit Kumar',
        year: 4,
        branch: 'mechanical',
        cgpa: 9.0,
        subjects: ['Thermodynamics', 'Fluid Mechanics', 'Heat Transfer'],
        bio: 'Mechanical engineering student with strong fundamentals in thermal systems.',
        availability: 'Weekdays 7-9 PM'
    }
];

// Navigation Management
function initializeNavigation() {
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Add scroll listener for sticky navbar
    window.addEventListener('scroll', debounce(handleScroll, 10));
}

function handleNavClick(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
        smoothScrollTo(targetSection);
    }
}

function handleScroll() {
    const scrollTop = window.pageYOffset;

    // Add scrolled class to navbar
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active navigation link
    updateActiveNavLink();
}

function updateActiveNavLink(activeId = null) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (activeId) {
        const activeLink = document.querySelector(`[href="#${activeId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } else {
        // Find the current section based on scroll position
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
}

function smoothScrollTo(element) {
    const navbarHeight = navbar.offsetHeight;
    const elementPosition = element.offsetTop - navbarHeight;

    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Page Navigation
function showServices() {
    if (homeScreen && servicesPage) {
        homeScreen.classList.add('hidden');
        servicesPage.classList.remove('hidden');

        // Hide footer and other sections
        const footer = document.querySelector('.footer');
        const aboutSection = document.getElementById('about');
        const contactSection = document.getElementById('contact');
        
        if (footer) footer.style.display = 'none';
        if (aboutSection) aboutSection.style.display = 'none';
        if (contactSection) contactSection.style.display = 'none';

        // Animate service cards entrance
        setTimeout(() => {
            animateCardsEntrance();
        }, 100);

        // Update navigation
        updateActiveNavLink('services');
    }
}

function showHome() {
    if (homeScreen && servicesPage) {
        servicesPage.classList.add('hidden');
        homeScreen.classList.remove('hidden');

        // Show footer and other sections again
        const footer = document.querySelector('.footer');
        const aboutSection = document.getElementById('about');
        const contactSection = document.getElementById('contact');
        
        if (footer) footer.style.display = 'block';
        if (aboutSection) aboutSection.style.display = 'block';
        if (contactSection) contactSection.style.display = 'block';

        // Update navigation
        updateActiveNavLink('home');
    }
}

function animateCardsEntrance() {
    if (serviceCards) {
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }
}

// Service Card Interactions
// function handleServiceClick(event) {
//     const serviceCard = event.currentTarget;
//     const serviceId = serviceCard.getAttribute('data-service');

//     if (serviceId && services[serviceId]) {
//         showServiceDetails(serviceId);
//     }
// }
function handleServiceClick(event) {
    const serviceCard = event.currentTarget;
    const serviceId = serviceCard.getAttribute('data-service');

    if (serviceId === 'complaints') {
        showComplaintModal();
    } else if (serviceId === 'lost-found') {
        showLostFoundModal();
    } else if (serviceId === 'mentorship') {
        showMentorshipModal();
    } else if (serviceId === 'events') {
        showEventsModal();
    } else if (serviceId === 'notes') {
        showNotesModal();
    } else if (serviceId === 'papers') {
        showPapersModal();
    } else if (serviceId === 'forum') {
        showForumModal();
    } else {
        showNotification('Coming Soon!', 'info');
    }
}

function handleCardHover(event) {
    const card = event.currentTarget;
    card.style.transform = 'translateY(-8px) scale(1.02)';
}

function handleCardLeave(event) {
    const card = event.currentTarget;
    card.style.transform = 'translateY(0) scale(1)';
}

function showServiceDetails(service) {
    const serviceInfo = services[service];
    if (serviceInfo) {
        showNotification(`Opening ${serviceInfo.name}...`, 'info');
        // Future implementation for service details
    }
}

// Auth Modal Management
function initializeAuthModal() {
    // Show auth modal when Sign In button is clicked
    if (startBtn) {
        startBtn.addEventListener('click', showAuthModal);
    }

    // Close modal when close button is clicked
    if (authCloseBtn) {
        authCloseBtn.addEventListener('click', hideAuthModal);
    }

    // Switch between sign in and sign up forms
    if (showSignUpBtn) {
        showSignUpBtn.addEventListener('click', showSignUpForm);
    }

    if (showSignInBtn) {
        showSignInBtn.addEventListener('click', showSignInForm);
    }

    // Handle form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Handle OTP sending
    if (sendOTPBtn) {
        sendOTPBtn.addEventListener('click', sendOTP);
    }

    if (sendRegOTPBtn) {
        sendRegOTPBtn.addEventListener('click', sendRegOTP);
    }

    // Close modal when clicking outside
    if (authModal) {
        authModal.addEventListener('click', (event) => {
            if (event.target === authModal) {
                hideAuthModal();
            }
        });
    }
}

function showAuthModal() {
    if (authModal) {
        authModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideAuthModal() {
    if (authModal) {
        authModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function showSignUpForm() {
    if (signInForm && signUpForm) {
        signInForm.classList.add('hidden');
        signUpForm.classList.remove('hidden');
    }
}

function showSignInForm() {
    if (signInForm && signUpForm) {
        signUpForm.classList.add('hidden');
        signInForm.classList.remove('hidden');
    }
}

function sendOTP() {
    const emailInput = document.getElementById('loginEmail');
    const email = emailInput ? emailInput.value.trim() : '';

    if (!email) {
        showNotification('Please enter your email or mobile number', 'error');
        return;
    }

    // Simulate OTP sending
    if (sendOTPBtn) {
        sendOTPBtn.disabled = true;
        sendOTPBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            sendOTPBtn.disabled = false;
            sendOTPBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send OTP';
            showNotification('OTP sent successfully! Check your email/mobile', 'success');
        }, 2000);
    }
}

function sendRegOTP() {
    const emailInput = document.getElementById('regEmail');
    const mobileInput = document.getElementById('regMobile');
    const email = emailInput ? emailInput.value.trim() : '';
    const mobile = mobileInput ? mobileInput.value.trim() : '';

    if (!email && !mobile) {
        showNotification('Please enter your email or mobile number', 'error');
        return;
    }

    // Simulate OTP sending
    if (sendRegOTPBtn) {
        sendRegOTPBtn.disabled = true;
        sendRegOTPBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            sendRegOTPBtn.disabled = false;
            sendRegOTPBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send OTP';
            showNotification('OTP sent successfully! Check your email/mobile', 'success');
        }, 2000);
    }
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail')?.value.trim();
    const otp = document.getElementById('loginOTP')?.value.trim();

    if (!email || !otp) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (otp.length !== 6) {
        showNotification('Please enter a valid 6-digit OTP', 'error');
        return;
    }

    // Simulate login process
    showNotification('Signing in...', 'info');

    setTimeout(() => {
        showNotification('Welcome back! You are now signed in.', 'success');
        hideAuthModal();
        // Update button text
        if (startBtn) {
            startBtn.innerHTML = '<i class="fas fa-user"></i> My Account';
        }
    }, 2000);
}

function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('regName')?.value.trim();
    const email = document.getElementById('regEmail')?.value.trim();
    const mobile = document.getElementById('regMobile')?.value.trim();
    const year = document.getElementById('regYear')?.value;
    const branch = document.getElementById('regBranch')?.value;
    const otp = document.getElementById('regOTP')?.value.trim();

    if (!name || !email || !mobile || !year || !branch || !otp) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (otp.length !== 6) {
        showNotification('Please enter a valid 6-digit OTP', 'error');
        return;
    }

    // Simulate registration process
    showNotification('Creating your account...', 'info');

    setTimeout(() => {
        showNotification('Account created successfully! Welcome to Jebby Ecosystem.', 'success');
        hideAuthModal();
        showSignInForm(); // Switch back to sign in form
        // Update button text
        if (startBtn) {
            startBtn.innerHTML = '<i class="fas fa-user"></i> My Account';
        }
    }, 2000);
}

// Complaint Modal Management
function initializeComplaintModal() {
    // Close modal when close button is clicked
    if (complaintCloseBtn) {
        complaintCloseBtn.addEventListener('click', hideComplaintModal);
    }

    // Close modal when cancel button is clicked
    const complaintCancelBtn = document.getElementById('complaintCancelBtn');
    if (complaintCancelBtn) {
        complaintCancelBtn.addEventListener('click', hideComplaintModal);
    }

    // Handle form submission
    if (complaintForm) {
        complaintForm.addEventListener('submit', handleComplaintSubmission);
    }

    // Handle file upload display
    const fileInput = document.getElementById('complaintAttachment');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }

    // Handle new complaint button
    const complaintNewBtn = document.getElementById('complaintNewBtn');
    if (complaintNewBtn) {
        complaintNewBtn.addEventListener('click', showNewComplaintForm);
    }

    // Close modal when clicking outside
    if (complaintModal) {
        complaintModal.addEventListener('click', (event) => {
            if (event.target === complaintModal) {
                hideComplaintModal();
            }
        });
    }

    // Dynamic category updates based on type
    const complaintType = document.getElementById('complaintType');
    const complaintCategory = document.getElementById('complaintCategory');
    if (complaintType && complaintCategory) {
        complaintType.addEventListener('change', updateCategoryOptions);
    }
}

function showComplaintModal() {
    if (complaintModal) {
        complaintModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        resetComplaintForm();
    }
}

function hideComplaintModal() {
    if (complaintModal) {
        complaintModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        resetComplaintForm();
    }
}

function resetComplaintForm() {
    if (complaintForm && complaintSuccess) {
        complaintForm.classList.remove('hidden');
        complaintSuccess.classList.add('hidden');
        complaintForm.reset();

        // Clear file upload display
        const fileUploadDisplay = document.querySelector('.file-upload-display span');
        if (fileUploadDisplay) {
            fileUploadDisplay.textContent = 'Click to upload files or drag and drop';
        }
    }
}

function showNewComplaintForm() {
    resetComplaintForm();
}

function updateCategoryOptions() {
    const complaintType = document.getElementById('complaintType');
    const complaintCategory = document.getElementById('complaintCategory');

    if (!complaintType || !complaintCategory) return;

    const type = complaintType.value;
    let categories = [];

    switch (type) {
        case 'complaint':
            categories = [
                { value: 'academic', text: 'Academic Services' },
                { value: 'food', text: 'Food Services' },
                { value: 'transport', text: 'Transportation' },
                { value: 'accommodation', text: 'Accommodation' },
                { value: 'staff', text: 'Staff Behavior' },
                { value: 'facilities', text: 'Campus Facilities' },
                { value: 'other', text: 'Other' }
            ];
            break;
        case 'feedback':
            categories = [
                { value: 'academic', text: 'Academic Programs' },
                { value: 'services', text: 'Student Services' },
                { value: 'facilities', text: 'Campus Facilities' },
                { value: 'events', text: 'Events & Activities' },
                { value: 'website', text: 'Website/App' },
                { value: 'other', text: 'General Feedback' }
            ];
            break;
        case 'suggestion':
            categories = [
                { value: 'academic', text: 'Academic Improvements' },
                { value: 'facilities', text: 'Facility Enhancements' },
                { value: 'services', text: 'New Services' },
                { value: 'events', text: 'Event Ideas' },
                { value: 'technology', text: 'Technology Upgrades' },
                { value: 'other', text: 'Other Suggestions' }
            ];
            break;
        case 'bug-report':
            categories = [
                { value: 'website', text: 'Website Issues' },
                { value: 'mobile-app', text: 'Mobile App' },
                { value: 'portal', text: 'Student Portal' },
                { value: 'booking', text: 'Booking System' },
                { value: 'payment', text: 'Payment System' },
                { value: 'other', text: 'Other Technical Issues' }
            ];
            break;
        default:
            categories = [
                { value: 'academic', text: 'Academic Services' },
                { value: 'food', text: 'Food Services' },
                { value: 'transport', text: 'Transportation' },
                { value: 'accommodation', text: 'Accommodation' },
                { value: 'technical', text: 'Technical Issues' },
                { value: 'staff', text: 'Staff Behavior' },
                { value: 'facilities', text: 'Campus Facilities' },
                { value: 'other', text: 'Other' }
            ];
    }

    // Clear existing options except the first one
    complaintCategory.innerHTML = '<option value="">Select Category</option>';

    // Add new options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.value;
        option.textContent = category.text;
        complaintCategory.appendChild(option);
    });
}

function handleFileUpload(event) {
    const files = event.target.files;
    const fileUploadDisplay = document.querySelector('.file-upload-display span');

    if (files.length > 0) {
        const fileNames = Array.from(files).map(file => file.name).join(', ');
        fileUploadDisplay.textContent = `Selected: ${fileNames}`;
        fileUploadDisplay.style.color = 'var(--primary-color)';
    } else {
        fileUploadDisplay.textContent = 'Click to upload files or drag and drop';
        fileUploadDisplay.style.color = '';
    }
}

function validateComplaintForm() {
    const requiredFields = [
        { id: 'complaintType', name: 'Type' },
        { id: 'complaintCategory', name: 'Category' },
        { id: 'complaintPriority', name: 'Priority' },
        { id: 'complaintSubject', name: 'Subject' },
        { id: 'complaintDescription', name: 'Description' }
    ];

    const errors = [];

    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors.push(`${field.name} is required`);
        }
    });

    // Validate subject length
    const subject = document.getElementById('complaintSubject');
    if (subject && subject.value.trim().length < 10) {
        errors.push('Subject must be at least 10 characters long');
    }

    // Validate description length
    const description = document.getElementById('complaintDescription');
    if (description && description.value.trim().length < 20) {
        errors.push('Description must be at least 20 characters long');
    }

    // Validate file size if files are uploaded
    const fileInput = document.getElementById('complaintAttachment');
    if (fileInput && fileInput.files.length > 0) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        for (let file of fileInput.files) {
            if (file.size > maxSize) {
                errors.push(`File "${file.name}" is too large. Maximum size is 5MB`);
            }
        }
    }

    return errors;
}

function handleComplaintSubmission(event) {
    event.preventDefault();

    // Validate form
    const errors = validateComplaintForm();
    if (errors.length > 0) {
        showNotification(errors[0], 'error');
        return;
    }

    // Get form data
    const formData = {
        type: document.getElementById('complaintType').value,
        category: document.getElementById('complaintCategory').value,
        priority: document.getElementById('complaintPriority').value,
        location: document.getElementById('complaintLocation').value,
        subject: document.getElementById('complaintSubject').value,
        description: document.getElementById('complaintDescription').value,
        anonymous: document.getElementById('complaintAnonymous').checked,
        files: document.getElementById('complaintAttachment').files
    };

    // Show loading state
    const submitBtn = complaintForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    // Simulate submission process
    setTimeout(() => {
        // Generate ticket ID
        const ticketId = generateTicketId();
        document.getElementById('ticketId').textContent = ticketId;

        // Show success message
        complaintForm.classList.add('hidden');
        complaintSuccess.classList.remove('hidden');

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success notification
        showNotification('Complaint submitted successfully!', 'success');

        // Log submission (for development)
        console.log('Complaint submitted:', formData);

    }, 2000);
}

function generateTicketId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    return `#CF-${year}${month}${day}-${random}`;
}

// Lost & Found Modal Management

function initializeLostFoundModal() {
    const lostFoundModal = document.getElementById('lostFoundModal');
    const tabBtns = lostFoundModal.querySelectorAll('.tab-btn');
    const tabContents = lostFoundModal.querySelectorAll('.tab-content');
    const reportLostForm = document.getElementById('reportLostForm');
    const reportFoundForm = document.getElementById('reportFoundForm');
    const lostFoundSuccess = document.getElementById('lostFoundSuccess');
    const lostFoundNewBtn = document.getElementById('lostFoundNewBtn');
    const lostCancelBtn = document.getElementById('lostCancelBtn');
    const foundCancelBtn = document.getElementById('foundCancelBtn');
    const lostFoundCloseBtn = lostFoundModal.querySelector('.lost-found-close-btn');

    // Tab switching
    // ...inside initializeLostFoundModal...
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.getAttribute('data-tab');
            setTimeout(() => {
                if (tab === 'search') {
                    document.getElementById('searchTab').classList.add('active');
                } else if (tab === 'report-lost') {
                    document.getElementById('reportLostTab').classList.add('active');
                } else if (tab === 'report-found') {
                    document.getElementById('reportFoundTab').classList.add('active');
                }
            }, 10); // slight delay for transition
            lostFoundSuccess.classList.add('hidden');
        });
    });

    // Report Lost Form Submission
    if (reportLostForm) {
        reportLostForm.addEventListener('submit', function (e) {
            e.preventDefault();
            lostFoundSuccess.classList.remove('hidden');
            document.getElementById('successMessage').textContent = "Your lost item report has been submitted successfully.";
            document.getElementById('referenceId').textContent = "#LF-" + Math.floor(Math.random() * 10000);
            reportLostForm.reset();
            tabContents.forEach(c => c.classList.remove('active'));
        });
    }

    // Report Found Form Submission
    if (reportFoundForm) {
        reportFoundForm.addEventListener('submit', function (e) {
            e.preventDefault();
            lostFoundSuccess.classList.remove('hidden');
            document.getElementById('successMessage').textContent = "Your found item report has been submitted successfully.";
            document.getElementById('referenceId').textContent = "#LF-" + Math.floor(Math.random() * 10000);
            reportFoundForm.reset();
            tabContents.forEach(c => c.classList.remove('active'));
        });
    }

    // New Report Button
    if (lostFoundNewBtn) {
        lostFoundNewBtn.addEventListener('click', function () {
            lostFoundSuccess.classList.add('hidden');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            tabBtns[0].classList.add('active');
            tabContents[0].classList.add('active');
        });
    }

    // Cancel Buttons
    if (lostCancelBtn) {
        lostCancelBtn.addEventListener('click', function () {
            reportLostForm.reset();
            lostFoundModal.classList.add('hidden');
        });
    }
    if (foundCancelBtn) {
        foundCancelBtn.addEventListener('click', function () {
            reportFoundForm.reset();
            lostFoundModal.classList.add('hidden');
        });
    }

    // Close Modal
    if (lostFoundCloseBtn) {
        lostFoundCloseBtn.addEventListener('click', function () {
            lostFoundModal.classList.add('hidden');
            lostFoundSuccess.classList.add('hidden');
            reportLostForm.reset();
            reportFoundForm.reset();
        });
    }
    // ...inside initializeLostFoundModal...

    if (lostFoundCloseBtn) {
        lostFoundCloseBtn.addEventListener('click', function () {
            lostFoundModal.classList.add('hidden');
            lostFoundSuccess.classList.add('hidden');
            reportLostForm.reset();
            reportFoundForm.reset();
            document.body.style.overflow = 'auto'; // Restore scroll
        });
    }

    // Also, when opening the modal, prevent background scroll:
    function openLostFoundModal() {
        lostFoundModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }
}

// ...existing code...

document.addEventListener('DOMContentLoaded', function () {
    // ...existing code...
    initializeLostFoundModal();
    // ...existing code...
});

function showLostFoundModal() {
    if (lostFoundModal) {
        lostFoundModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        resetLostFoundForms();
        switchTab('search'); // Default to search tab
    }
}

function hideLostFoundModal() {
    if (lostFoundModal) {
        lostFoundModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        resetLostFoundForms();
    }
}

function switchTab(tabName) {
    // Remove active class from all tabs and contents
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to selected tab and content
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}Tab`);

    if (activeBtn) activeBtn.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

function resetLostFoundForms() {
    const reportLostForm = document.getElementById('reportLostForm');
    const reportFoundForm = document.getElementById('reportFoundForm');

    if (reportLostForm) reportLostForm.reset();
    if (reportFoundForm) reportFoundForm.reset();

    // Reset file upload displays
    const fileDisplays = document.querySelectorAll('#lostFoundModal .file-upload-display span');
    fileDisplays.forEach(display => {
        display.textContent = 'Click to upload an image';
        display.style.color = '';
    });

    // Hide success message and show forms
    if (lostFoundSuccess) {
        lostFoundSuccess.classList.add('hidden');
    }

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    const lostDate = document.getElementById('lostDate');
    const foundDate = document.getElementById('foundDate');

    if (lostDate) lostDate.value = today;
    if (foundDate) foundDate.value = today;
}

function showNewLostFoundForm() {
    resetLostFoundForms();
    switchTab('search');
}

// Sample data for demonstration
const sampleLostItems = [
    {
        id: 1,
        name: "iPhone 13 Pro",
        category: "electronics",
        location: "library",
        date: "2024-01-15",
        description: "Black iPhone 13 Pro with a blue case. Lost near the study area on the second floor.",
        contact: "john.doe@student.coep.ac.in",
        type: "lost"
    },
    {
        id: 2,
        name: "Blue Backpack",
        category: "bags",
        location: "canteen",
        date: "2024-01-14",
        description: "Navy blue backpack with laptop compartment. Contains textbooks and notebooks.",
        contact: "9876543210",
        type: "lost"
    },
    {
        id: 3,
        name: "Silver Watch",
        category: "accessories",
        location: "playground",
        date: "2024-01-13",
        description: "Silver analog watch with black leather strap. Found near the basketball court.",
        contact: "jane.smith@student.coep.ac.in",
        type: "found",
        currentLocation: "Security Office, Main Building"
    }
];

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const locationFilter = document.getElementById('locationFilter');
    const dateFilter = document.getElementById('dateFilter');
    const searchResults = document.getElementById('searchResults');

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const category = categoryFilter ? categoryFilter.value : '';
    const location = locationFilter ? locationFilter.value : '';
    const dateRange = dateFilter ? dateFilter.value : '';

    // Filter sample data based on search criteria
    let filteredItems = sampleLostItems.filter(item => {
        const matchesSearch = !searchTerm ||
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm);

        const matchesCategory = !category || item.category === category;
        const matchesLocation = !location || item.location === location;

        // Simple date filtering (in real app, this would be more sophisticated)
        const matchesDate = !dateRange || true; // Simplified for demo

        return matchesSearch && matchesCategory && matchesLocation && matchesDate;
    });

    displaySearchResults(filteredItems);
}

function displaySearchResults(items) {
    const searchResults = document.getElementById('searchResults');

    if (!searchResults) return;

    if (items.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No Items Found</h3>
                <p>No items match your search criteria. Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }

    const resultsHTML = items.map(item => `
        <div class="search-result-item">
            <div class="result-header">
                <div>
                    <div class="result-title">${item.name}</div>
                    <div class="result-category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</div>
                </div>
                <div class="result-category" style="background: ${item.type === 'lost' ? '#ef4444' : '#10b981'}">
                    ${item.type === 'lost' ? 'LOST' : 'FOUND'}
                </div>
            </div>
            
            <div class="result-details">
                <div class="result-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${item.location.charAt(0).toUpperCase() + item.location.slice(1)}</span>
                </div>
                <div class="result-detail">
                    <i class="fas fa-calendar"></i>
                    <span>${new Date(item.date).toLocaleDateString()}</span>
                </div>
                ${item.currentLocation ? `
                    <div class="result-detail">
                        <i class="fas fa-location-arrow"></i>
                        <span>${item.currentLocation}</span>
                    </div>
                ` : ''}
            </div>
            
            <div class="result-description">
                ${item.description}
            </div>
            
            <div class="result-contact">
                <span>Contact: ${item.contact}</span>
                <button class="contact-btn" onclick="contactOwner('${item.contact}')">
                    <i class="fas fa-envelope"></i> Contact
                </button>
            </div>
        </div>
    `).join('');

    searchResults.innerHTML = resultsHTML;
}

function contactOwner(contact) {
    if (contact.includes('@')) {
        window.location.href = `mailto:${contact}`;
    } else {
        window.location.href = `tel:${contact}`;
    }
}

function handleLostFoundFileUpload(event, type) {
    const files = event.target.files;
    const fileUploadDisplay = event.target.parentElement.querySelector('.file-upload-display span');

    if (files.length > 0) {
        const fileName = files[0].name;
        fileUploadDisplay.textContent = `Selected: ${fileName}`;
        fileUploadDisplay.style.color = '#ff9f43';
    } else {
        fileUploadDisplay.textContent = 'Click to upload an image';
        fileUploadDisplay.style.color = '';
    }
}

function validateLostFoundForm(formType) {
    const prefix = formType === 'lost' ? 'lost' : 'found';
    const requiredFields = [
        { id: `${prefix}ItemName`, name: 'Item Name' },
        { id: `${prefix}Category`, name: 'Category' },
        { id: `${prefix}Location`, name: 'Location' },
        { id: `${prefix}Date`, name: 'Date' },
        { id: `${prefix}Description`, name: 'Description' },
        { id: `${prefix}ContactInfo`, name: 'Contact Information' }
    ];

    if (formType === 'found') {
        requiredFields.push({ id: 'foundCurrentLocation', name: 'Current Location of Item' });
    }

    const errors = [];

    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors.push(`${field.name} is required`);
        }
    });

    // Validate description length
    const description = document.getElementById(`${prefix}Description`);
    if (description && description.value.trim().length < 10) {
        errors.push('Description must be at least 10 characters long');
    }

    // Validate file size if uploaded
    const fileInput = document.getElementById(`${prefix}Image`);
    if (fileInput && fileInput.files.length > 0) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const file = fileInput.files[0];
        if (file.size > maxSize) {
            errors.push(`Image file is too large. Maximum size is 5MB`);
        }
    }

    return errors;
}

function handleLostItemSubmission(event) {
    event.preventDefault();

    const errors = validateLostFoundForm('lost');
    if (errors.length > 0) {
        showNotification(errors[0], 'error');
        return;
    }

    // Get form data
    const formData = {
        itemName: document.getElementById('lostItemName').value,
        category: document.getElementById('lostCategory').value,
        location: document.getElementById('lostLocation').value,
        date: document.getElementById('lostDate').value,
        description: document.getElementById('lostDescription').value,
        contactInfo: document.getElementById('lostContactInfo').value,
        image: document.getElementById('lostImage').files[0]
    };

    submitLostFoundReport('lost', formData);
}

function handleFoundItemSubmission(event) {
    event.preventDefault();

    const errors = validateLostFoundForm('found');
    if (errors.length > 0) {
        showNotification(errors[0], 'error');
        return;
    }

    // Get form data
    const formData = {
        itemName: document.getElementById('foundItemName').value,
        category: document.getElementById('foundCategory').value,
        location: document.getElementById('foundLocation').value,
        date: document.getElementById('foundDate').value,
        description: document.getElementById('foundDescription').value,
        contactInfo: document.getElementById('foundContactInfo').value,
        currentLocation: document.getElementById('foundCurrentLocation').value,
        image: document.getElementById('foundImage').files[0]
    };

    submitLostFoundReport('found', formData);
}

function submitLostFoundReport(type, formData) {
    const submitBtn = document.querySelector(`#report${type.charAt(0).toUpperCase() + type.slice(1)}Form button[type="submit"]`);
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    // Simulate submission process
    setTimeout(() => {
        // Generate reference ID
        const referenceId = generateLostFoundReferenceId(type);
        document.getElementById('referenceId').textContent = referenceId;

        // Update success message
        const successMessage = document.getElementById('successMessage');
        if (type === 'lost') {
            successMessage.textContent = 'Your lost item report has been submitted successfully. We\'ll notify you if someone reports finding a matching item.';
        } else {
            successMessage.textContent = 'Your found item report has been submitted successfully. We\'ll help connect you with the owner if they report it missing.';
        }

        // Hide all tab contents and show success
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.classList.remove('active'));

        lostFoundSuccess.classList.remove('hidden');

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success notification
        showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} item reported successfully!`, 'success');

        // Log submission (for development)
        console.log(`${type} item submitted:`, formData);

    }, 2000);
}

function generateLostFoundReferenceId(type) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const prefix = type === 'lost' ? 'LT' : 'FD';

    return `#${prefix}-${year}${month}${day}-${random}`;
}

// Keyboard Navigation
function handleKeyboardNavigation(event) {
    // Close modals with Escape key
    if (event.key === 'Escape') {
        hideAuthModal();
        hideComplaintModal();
        hideLostFoundModal();
        closeDemoModal();
    }
}

// Touch Support
function addTouchSupport() {
    // Add touch event listeners for mobile devices
    if ('ontouchstart' in window) {
        document.addEventListener('touchstart', function () { }, { passive: true });
    }
}

// Loading Animation
function addLoadingAnimation() {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading-overlay';
    loadingElement.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading...</p>
        </div>
    `;

    // Add loading styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        .loading-spinner {
            text-align: center;
            color: var(--primary-color);
        }
        .loading-spinner i {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(loadingElement);

    // Remove loading after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingElement.parentNode) {
                loadingElement.parentNode.removeChild(loadingElement);
            }
        }, 500);
    });
}

// Ripple Effect
function addRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initializeRippleEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', addRippleEffect);
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(debounce.timeout);
            func(...args);
        };
        clearTimeout(debounce.timeout);
        debounce.timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add notification styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem 1.5rem;
            }
            .notification-info {
                border-left: 4px solid var(--primary-color);
            }
            .notification-success {
                border-left: 4px solid var(--success-color);
            }
            .notification-error {
                border-left: 4px solid var(--error-color);
            }
            .notification-warning {
                border-left: 4px solid var(--warning-color);
            }
            .notification-close {
                background: none;
                border: none;
                color: var(--text-muted);
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                transition: all 0.3s ease;
            }
            .notification-close:hover {
                background: var(--bg-tertiary);
                color: var(--text-primary);
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Notices Management
function initializeNoticesSection() {
    const viewAllBtn = document.querySelector('.view-all-btn');
    const addNoticeBtn = document.querySelector('.add-notice-btn');

    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', showAllNotices);
    }

    if (addNoticeBtn) {
        addNoticeBtn.addEventListener('click', showAddNoticeForm);
    }

    // Auto-refresh notices every 5 minutes
    setInterval(refreshNotices, 300000);
}

function showAllNotices() {
    showNotification('Opening all notices...', 'info');
    // Future implementation: Open a modal or navigate to notices page
}

function showAddNoticeForm() {
    showNotification('Notice submission form coming soon!', 'info');
    // Future implementation: Open notice submission form
}

function refreshNotices() {
    // Future implementation: Fetch latest notices from server
    console.log('Refreshing notices...');
}

// Sample notices data (in real app, this would come from server)
const sampleNotices = [
    {
        id: 1,
        title: 'Library Closure Notice',
        content: 'The main library will be closed tomorrow (Jan 16) from 2 PM to 6 PM for maintenance work. Please plan your study schedule accordingly.',
        priority: 'urgent',
        category: 'Academic',
        date: new Date(),
        author: 'Library Administration'
    },
    {
        id: 2,
        title: 'Mess Menu Update',
        content: 'Special dinner menu today featuring South Indian cuisine. Timing: 7:00 PM - 9:30 PM. Don\'t miss the delicious dosa and sambar!',
        priority: 'important',
        category: 'Food Services',
        date: new Date(Date.now() - 3600000), // 1 hour ago
        author: 'Mess Committee'
    },
    {
        id: 3,
        title: 'Tech Fest Registration Open',
        content: 'Registration for the annual Tech Fest 2024 is now open! Various competitions including coding, robotics, and innovation challenges. Register before Jan 20th.',
        priority: 'general',
        category: 'Events',
        date: new Date(Date.now() - 86400000), // 1 day ago
        author: 'Student Council'
    },
    {
        id: 4,
        title: 'Bus Schedule Change',
        content: 'Due to road construction, the evening bus (Route 3) timing has been changed to 6:15 PM instead of 6:00 PM. This change is effective from today.',
        priority: 'general',
        category: 'Transport',
        date: new Date(Date.now() - 172800000), // 2 days ago
        author: 'Transport Department'
    }
];

function formatNoticeDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
        return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
        return 'Yesterday, ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 0) {
        return 'Today, ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' + 
               date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
}

function updateNoticesDisplay() {
    const noticesContainer = document.querySelector('.notices-container');
    if (!noticesContainer) return;

    // Sort notices by priority and date
    const sortedNotices = sampleNotices.sort((a, b) => {
        const priorityOrder = { urgent: 3, important: 2, general: 1 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(b.date) - new Date(a.date);
    });

    // Display only the first 4 notices
    const displayNotices = sortedNotices.slice(0, 4);
    
    noticesContainer.innerHTML = displayNotices.map((notice, index) => `
        <div class="notice-item ${notice.priority}" style="animation-delay: ${(index + 1) * 0.1}s">
            <div class="notice-badge">
                <i class="fas ${getPriorityIcon(notice.priority)}"></i>
                ${notice.priority.toUpperCase()}
            </div>
            <div class="notice-content">
                <h3>${notice.title}</h3>
                <p>${notice.content}</p>
                <div class="notice-meta">
                    <span class="notice-date">
                        <i class="fas fa-calendar"></i>
                        ${formatNoticeDate(notice.date)}
                    </span>
                    <span class="notice-category">
                        <i class="fas fa-tag"></i>
                        ${notice.category}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

function getPriorityIcon(priority) {
    switch (priority) {
        case 'urgent': return 'fa-exclamation-triangle';
        case 'important': return 'fa-star';
        case 'general': return 'fa-info-circle';
        default: return 'fa-info-circle';
    }
}

// Mentorship Modal Management
function initializeMentorshipModal() {
    const mentorshipModal = document.getElementById('mentorshipModal');
    const mentorshipCloseBtn = mentorshipModal?.querySelector('.mentorship-close-btn');
    const mentorshipTabs = mentorshipModal?.querySelectorAll('.mentorship-tab-btn');
    const mentorRegistrationForm = document.getElementById('mentorRegistrationForm');
    const requestModal = document.getElementById('mentorshipRequestModal');
    const requestCloseBtn = requestModal?.querySelector('.request-close-btn');
    const requestForm = document.getElementById('mentorshipRequestForm');

    if (mentorshipCloseBtn) {
        mentorshipCloseBtn.addEventListener('click', hideMentorshipModal);
    }

    mentorshipTabs?.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchMentorshipTab(tabName);
        });
    });

    if (mentorRegistrationForm) {
        mentorRegistrationForm.addEventListener('submit', handleMentorRegistration);
    }

    if (requestCloseBtn) {
        requestCloseBtn.addEventListener('click', hideRequestModal);
    }

    if (requestForm) {
        requestForm.addEventListener('submit', handleMentorshipRequest);
    }

    const filters = ['branchFilter', 'yearFilter', 'subjectFilter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', filterMentors);
            filter.addEventListener('input', filterMentors);
        }
    });
}

function showMentorshipModal() {
    const mentorshipModal = document.getElementById('mentorshipModal');
    if (mentorshipModal) {
        mentorshipModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        displayMentors(sampleMentors);
    }
}

function hideMentorshipModal() {
    const mentorshipModal = document.getElementById('mentorshipModal');
    if (mentorshipModal) {
        mentorshipModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function switchMentorshipTab(tabName) {
    const tabs = document.querySelectorAll('.mentorship-tab-btn');
    const contents = document.querySelectorAll('.mentorship-tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}Tab`);

    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

function displayMentors(mentors) {
    const mentorsGrid = document.getElementById('mentorsGrid');
    if (!mentorsGrid) return;

    mentorsGrid.innerHTML = mentors.map(mentor => `
        <div class="mentor-card">
            <div class="mentor-header">
                <div>
                    <div class="mentor-name">${mentor.name}</div>
                    <div class="mentor-year-branch">${getYearText(mentor.year)} • ${getBranchName(mentor.branch)}</div>
                </div>
                <div class="mentor-cgpa">CGPA: ${mentor.cgpa}</div>
            </div>
            <div class="mentor-subjects">
                ${mentor.subjects.map(subject => `<span class="subject-tag">${subject}</span>`).join('')}
            </div>
            <div class="mentor-bio">${mentor.bio}</div>
            <div class="mentor-availability">
                <i class="fas fa-clock"></i> ${mentor.availability}
            </div>
            <button class="request-mentorship-btn" onclick="showRequestModal(${mentor.id})">
                <i class="fas fa-paper-plane"></i>
                Request Mentorship
            </button>
        </div>
    `).join('');
}

function filterMentors() {
    const branchFilter = document.getElementById('branchFilter')?.value || '';
    const yearFilter = document.getElementById('yearFilter')?.value || '';
    const subjectFilter = document.getElementById('subjectFilter')?.value.toLowerCase() || '';

    const filteredMentors = sampleMentors.filter(mentor => {
        const matchesBranch = !branchFilter || mentor.branch === branchFilter;
        const matchesYear = !yearFilter || mentor.year.toString() === yearFilter;
        const matchesSubject = !subjectFilter || 
            mentor.subjects.some(subject => subject.toLowerCase().includes(subjectFilter));
        return matchesBranch && matchesYear && matchesSubject;
    });

    displayMentors(filteredMentors);
}

function showRequestModal(mentorId) {
    const mentor = sampleMentors.find(m => m.id === mentorId);
    if (!mentor) return;

    const requestModal = document.getElementById('mentorshipRequestModal');
    const selectedMentorInfo = document.getElementById('selectedMentorInfo');
    
    if (selectedMentorInfo) {
        selectedMentorInfo.innerHTML = `
            <div class="selected-mentor-name">${mentor.name}</div>
            <div class="selected-mentor-details">${getYearText(mentor.year)} • ${getBranchName(mentor.branch)} • CGPA: ${mentor.cgpa}</div>
        `;
    }

    if (requestModal) {
        requestModal.classList.remove('hidden');
        requestModal.setAttribute('data-mentor-id', mentorId);
    }
}

function hideRequestModal() {
    const requestModal = document.getElementById('mentorshipRequestModal');
    if (requestModal) {
        requestModal.classList.add('hidden');
        document.getElementById('mentorshipRequestForm')?.reset();
    }
}

function handleMentorRegistration(event) {
    event.preventDefault();
    showNotification('Registering as mentor...', 'info');
    setTimeout(() => {
        showNotification('Successfully registered as mentor!', 'success');
        hideMentorshipModal();
        document.getElementById('mentorRegistrationForm')?.reset();
    }, 2000);
}

function handleMentorshipRequest(event) {
    event.preventDefault();
    const mentorId = document.getElementById('mentorshipRequestModal')?.getAttribute('data-mentor-id');
    const mentor = sampleMentors.find(m => m.id === parseInt(mentorId));
    
    showNotification('Sending mentorship request...', 'info');
    setTimeout(() => {
        showNotification(`Request sent to ${mentor?.name}!`, 'success');
        hideRequestModal();
    }, 1500);
}

function getYearText(year) {
    const yearMap = { 2: 'Second Year', 3: 'Third Year', 4: 'Fourth Year' };
    return yearMap[year] || `Year ${year}`;
}

function getBranchName(branch) {
    const branchMap = {
        cse: 'Computer Science',
        entc: 'Electronics & Telecom',
        electrical: 'Electrical',
        mechanical: 'Mechanical',
        aiml: 'AI & ML'
    };
    return branchMap[branch] || branch;
}

// COEP-specific events data with B.Tech branch targeting
const sampleEvents = [
    {
        id: 1,
        title: 'MindSpark 2024',
        organizer: 'CSI COEP',
        type: 'technical',
        date: '2024-03-15T09:00',
        venue: 'Main Campus',
        description: 'COEP\'s flagship technical festival featuring coding competitions, robotics, hackathons, and tech talks by industry experts.',
        deadline: '2024-03-10T23:59',
        maxParticipants: 1000,
        featured: true,
        poster: null,
        branches: ['cse', 'entc', 'electrical', 'instrumentation', 'aiml'],
        registrationLink: 'internal',
        isToday: false
    },
    {
        id: 2,
        title: 'Impressions 2024',
        organizer: 'Cultural Committee',
        type: 'cultural',
        date: '2024-02-20T18:00',
        venue: 'Open Air Theatre',
        description: 'COEP\'s annual cultural extravaganza showcasing talents in dance, music, drama, and literary events.',
        deadline: '2024-02-18T17:00',
        maxParticipants: 500,
        featured: true,
        poster: null,
        branches: ['all'],
        registrationLink: 'internal',
        isToday: false
    },
    {
        id: 3,
        title: 'ZEST Sports Festival',
        organizer: 'Sports Committee',
        type: 'sports',
        date: '2024-02-25T08:00',
        venue: 'Sports Complex',
        description: 'Inter-branch sports competition including cricket, football, basketball, athletics, and indoor games.',
        deadline: '2024-02-22T18:00',
        maxParticipants: 400,
        featured: true,
        poster: null,
        branches: ['all'],
        registrationLink: 'internal',
        isToday: false
    },
    {
        id: 4,
        title: 'Regatta Boat Racing',
        organizer: 'Regatta Committee',
        type: 'sports',
        date: '2024-03-05T07:00',
        venue: 'Mula-Mutha River',
        description: 'Traditional boat racing competition - a signature event of COEP with inter-college participation.',
        deadline: '2024-03-01T18:00',
        maxParticipants: 200,
        featured: true,
        poster: null,
        branches: ['all'],
        registrationLink: 'internal',
        isToday: false
    },
    {
        id: 5,
        title: 'ACM Programming Contest',
        organizer: 'ACM COEP',
        type: 'technical',
        date: '2024-02-18T10:00',
        venue: 'Computer Lab',
        description: 'Competitive programming contest for CSE and related branches.',
        deadline: '2024-02-16T23:59',
        maxParticipants: 100,
        featured: false,
        poster: null,
        branches: ['cse', 'aiml'],
        registrationLink: 'internal',
        isToday: true
    },
    {
        id: 6,
        title: 'Aerial Robotics Workshop',
        organizer: 'Aerial Robot Study Circle',
        type: 'workshop',
        date: '2024-03-08T10:00',
        venue: 'Robotics Lab',
        description: 'Learn drone programming and autonomous flight systems.',
        deadline: '2024-03-06T18:00',
        maxParticipants: 40,
        featured: false,
        poster: null,
        branches: ['entc', 'mechanical', 'cse'],
        registrationLink: 'internal',
        isToday: false
    }
];

// Events Modal Management
function initializeEventsModal() {
    const eventsModal = document.getElementById('eventsModal');
    const eventsCloseBtn = eventsModal?.querySelector('.events-close-btn');
    const eventsTabs = eventsModal?.querySelectorAll('.events-tab-btn');
    const createEventForm = document.getElementById('createEventForm');
    const eventCancelBtn = document.getElementById('eventCancelBtn');
    
    // Registration modal elements
    const registrationModal = document.getElementById('eventRegistrationModal');
    const registrationCloseBtn = registrationModal?.querySelector('.registration-close-btn');
    const registrationForm = document.getElementById('eventRegistrationForm');
    const regCancelBtn = document.getElementById('regCancelBtn');

    // Close main modal
    if (eventsCloseBtn) {
        eventsCloseBtn.addEventListener('click', hideEventsModal);
    }

    // Tab switching
    eventsTabs?.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchEventsTab(tabName);
        });
    });

    // Create event form
    if (createEventForm) {
        createEventForm.addEventListener('submit', handleEventCreation);
    }

    if (eventCancelBtn) {
        eventCancelBtn.addEventListener('click', hideEventsModal);
    }

    // Registration modal handlers
    if (registrationCloseBtn) {
        registrationCloseBtn.addEventListener('click', hideRegistrationModal);
    }

    if (regCancelBtn) {
        regCancelBtn.addEventListener('click', hideRegistrationModal);
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', handleEventRegistration);
    }

    // Filters
    const filters = ['eventTypeFilter', 'eventClubFilter', 'branchFilter', 'eventSearchFilter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', filterEvents);
            filter.addEventListener('input', filterEvents);
        }
    });

    // Close modals when clicking outside
    if (eventsModal) {
        eventsModal.addEventListener('click', (e) => {
            if (e.target === eventsModal) hideEventsModal();
        });
    }

    if (registrationModal) {
        registrationModal.addEventListener('click', (e) => {
            if (e.target === registrationModal) hideRegistrationModal();
        });
    }
}

function showEventsModal() {
    const eventsModal = document.getElementById('eventsModal');
    if (eventsModal) {
        eventsModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        displayEvents();
    }
}

function hideEventsModal() {
    const eventsModal = document.getElementById('eventsModal');
    if (eventsModal) {
        eventsModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function switchEventsTab(tabName) {
    const tabs = document.querySelectorAll('.events-tab-btn');
    const contents = document.querySelectorAll('.events-tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}EventsTab`);

    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
    
    if (tabName === 'discover') {
        displayEvents();
    }
}

function displayEvents() {
    const featuredGrid = document.getElementById('featuredGrid');
    const eventsGrid = document.getElementById('eventsGrid');
    
    if (featuredGrid) {
        const featuredEvents = sampleEvents.filter(event => event.featured);
        featuredGrid.innerHTML = featuredEvents.map(event => createEventCard(event)).join('');
    }
    
    if (eventsGrid) {
        const regularEvents = sampleEvents.filter(event => !event.featured);
        eventsGrid.innerHTML = regularEvents.map(event => createEventCard(event)).join('');
    }

    // Initialize filters with COEP clubs
    initializeEventFilters();
    
    // Show today's events notification
    displayTodayEvents();
}

function initializeEventFilters() {
    const clubFilter = document.getElementById('eventClubFilter');
    if (clubFilter && clubFilter.children.length <= 11) { // Check if not already populated
        const coepClubs = [
            { value: 'csicoep', text: 'CSI COEP' },
            { value: 'ieeecoep', text: 'IEEE COEP' },
            { value: 'acmcoep', text: 'ACM COEP' },
            { value: 'aerialrobot', text: 'Aerial Robot Study Circle' },
            { value: 'cultural', text: 'Cultural Committee' },
            { value: 'sports', text: 'Sports Committee' },
            { value: 'regatta', text: 'Regatta Committee' }
        ];
        
        coepClubs.forEach(club => {
            const option = document.createElement('option');
            option.value = club.value;
            option.textContent = club.text;
            clubFilter.appendChild(option);
        });
    }
}

function createEventCard(event) {
    const eventDate = new Date(event.date);
    const deadline = new Date(event.deadline);
    const isExpired = new Date() > deadline;
    const branchText = event.branches.includes('all') ? 'All Branches' : 
        event.branches.map(b => getBranchName(b)).join(', ');
    
    return `
        <div class="event-card ${event.featured ? 'featured' : ''} ${event.isToday ? 'today' : ''}">
            <div class="event-poster">
                <i class="fas fa-calendar-alt"></i>
                ${event.featured ? '<div class="featured-badge"><i class="fas fa-star"></i></div>' : ''}
                ${event.isToday ? '<div class="today-badge">TODAY</div>' : ''}
            </div>
            <div class="event-info">
                <div class="event-title">${event.title}</div>
                <div class="event-organizer">by ${event.organizer}</div>
                <div class="event-type">${event.type.toUpperCase()}</div>
                <div class="event-meta">
                    <div class="event-meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${eventDate.toLocaleDateString()}</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.venue}</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="fas fa-graduation-cap"></i>
                        <span>${branchText}</span>
                    </div>
                </div>
                <div class="event-description">${event.description}</div>
                <div class="event-deadline">
                    <i class="fas fa-hourglass-half"></i>
                    Deadline: ${deadline.toLocaleDateString()}
                </div>
                <button class="register-btn" onclick="showRegistrationModal(${event.id})" ${isExpired ? 'disabled' : ''}>
                    <i class="fas fa-${isExpired ? 'times' : 'check'}"></i>
                    ${isExpired ? 'Registration Closed' : 'Register Now'}
                </button>
            </div>
        </div>
    `;
}

function filterEvents() {
    const typeFilter = document.getElementById('eventTypeFilter')?.value || '';
    const clubFilter = document.getElementById('eventClubFilter')?.value || '';
    const branchFilter = document.getElementById('branchFilter')?.value || '';
    const searchFilter = document.getElementById('eventSearchFilter')?.value.toLowerCase() || '';

    const filteredEvents = sampleEvents.filter(event => {
        const matchesType = !typeFilter || event.type === typeFilter;
        const matchesClub = !clubFilter || event.organizer.toLowerCase().replace(/\s+/g, '').includes(clubFilter);
        const matchesBranch = !branchFilter || 
            event.branches.includes('all') || 
            event.branches.includes(branchFilter);
        const matchesSearch = !searchFilter || 
            event.title.toLowerCase().includes(searchFilter) ||
            event.description.toLowerCase().includes(searchFilter) ||
            event.organizer.toLowerCase().includes(searchFilter);
        
        return matchesType && matchesClub && matchesBranch && matchesSearch;
    });

    // Update both featured and regular events
    const featuredGrid = document.getElementById('featuredGrid');
    const eventsGrid = document.getElementById('eventsGrid');
    
    if (featuredGrid) {
        const featuredFiltered = filteredEvents.filter(event => event.featured);
        featuredGrid.innerHTML = featuredFiltered.map(event => createEventCard(event)).join('');
    }
    
    if (eventsGrid) {
        const regularFiltered = filteredEvents.filter(event => !event.featured);
        eventsGrid.innerHTML = regularFiltered.map(event => createEventCard(event)).join('');
    }
}

function displayTodayEvents() {
    const todayEvents = sampleEvents.filter(event => event.isToday);
    if (todayEvents.length > 0) {
        showNotification(`${todayEvents.length} event(s) happening today!`, 'info');
    }
}

function showRegistrationModal(eventId) {
    const event = sampleEvents.find(e => e.id === eventId);
    if (!event) return;

    const registrationModal = document.getElementById('eventRegistrationModal');
    const selectedEventDetails = document.getElementById('selectedEventDetails');
    
    if (selectedEventDetails) {
        const eventDate = new Date(event.date);
        const branchText = event.branches.includes('all') ? 'All Branches' : 
            event.branches.map(b => getBranchName(b)).join(', ');
        
        selectedEventDetails.innerHTML = `
            <div class="selected-event-title">${event.title}</div>
            <div class="selected-event-info">
                ${event.organizer} • ${eventDate.toLocaleDateString()} • ${event.venue}
            </div>
            <div class="event-branch-info">
                <i class="fas fa-graduation-cap"></i>
                Eligible Branches: ${branchText}
            </div>
            <div class="event-participants">
                <i class="fas fa-users"></i>
                Max Participants: ${event.maxParticipants}
            </div>
        `;
    }

    if (registrationModal) {
        registrationModal.classList.remove('hidden');
        registrationModal.setAttribute('data-event-id', eventId);
        
        // Auto-fill form with Jebby profile data (simulated)
        document.getElementById('regFullName').value = 'Student Name'; // From auth
        document.getElementById('regEmail').value = 'student@coep.ac.in'; // From auth
    }
}

function hideRegistrationModal() {
    const registrationModal = document.getElementById('eventRegistrationModal');
    if (registrationModal) {
        registrationModal.classList.add('hidden');
        document.getElementById('eventRegistrationForm')?.reset();
    }
}

function handleEventCreation(event) {
    event.preventDefault();
    
    // Validate COEP email authentication (simulated)
    const organizerEmail = 'club@coep.ac.in'; // From auth
    if (!organizerEmail.includes('@coep.ac.in')) {
        showNotification('Only COEP college email addresses can create events', 'error');
        return;
    }
    
    const formData = {
        title: document.getElementById('eventTitle')?.value,
        organizer: document.getElementById('eventOrganizer')?.value,
        type: document.getElementById('eventType')?.value,
        venue: document.getElementById('eventVenue')?.value,
        dateTime: document.getElementById('eventDateTime')?.value,
        deadline: document.getElementById('eventDeadline')?.value,
        description: document.getElementById('eventDescription')?.value,
        maxParticipants: document.getElementById('eventMaxParticipants')?.value,
        poster: document.getElementById('eventPoster')?.files[0]
    };
    
    showNotification('Creating event...', 'info');
    setTimeout(() => {
        showNotification('Event created successfully! It will be reviewed before publishing.', 'success');
        hideEventsModal();
        document.getElementById('createEventForm')?.reset();
        
        // Simulate event creation analytics
        console.log('Event Creation Analytics:', {
            ...formData,
            createdBy: organizerEmail,
            timestamp: new Date().toISOString()
        });
    }, 2000);
}

function handleEventRegistration(event) {
    event.preventDefault();
    const eventId = document.getElementById('eventRegistrationModal')?.getAttribute('data-event-id');
    const eventData = sampleEvents.find(e => e.id === parseInt(eventId));
    const selectedBranch = document.getElementById('regBranch')?.value;
    
    // Validate B.Tech branch eligibility
    if (eventData && !eventData.branches.includes('all') && !eventData.branches.includes(selectedBranch)) {
        showNotification('This event is not available for your branch', 'error');
        return;
    }
    
    // Auto-fill from Jebby profile (simulated)
    const formData = {
        name: document.getElementById('regFullName')?.value,
        mis: document.getElementById('regMISNumber')?.value,
        email: document.getElementById('regEmail')?.value,
        branch: selectedBranch,
        phone: document.getElementById('regPhone')?.value,
        eventId: eventId
    };
    
    showNotification('Registering for event...', 'info');
    setTimeout(() => {
        showNotification(`Successfully registered for ${eventData?.title}! Confirmation sent to your email.`, 'success');
        hideRegistrationModal();
        
        // Simulate analytics tracking
        console.log('Event Registration Analytics:', {
            eventId: eventId,
            eventTitle: eventData?.title,
            userBranch: selectedBranch,
            timestamp: new Date().toISOString()
        });
    }, 1500);
}

function getEventTypeColor(type) {
    const colors = {
        technical: '#667eea',
        cultural: '#ff6b6b',
        sports: '#10b981',
        workshop: '#f59e0b',
        induction: '#8b5cf6'
    };
    return colors[type] || '#6b7280';
}

// COEP Tech B.Tech Notes Data Structure
const notesData = {
    cse: {
        name: 'Computer Science and Engineering (CSE)',
        semesters: {
            3: {
                subjects: {
                    'Data Structures and Algorithms': [
                        { id: 1, title: 'Arrays and Linked Lists', description: 'Basic data structures with examples and implementations', author: 'Rahul Sharma', date: '2024-01-15', type: 'Lecture Notes', downloads: 245, upvotes: 18 },
                        { id: 2, title: 'Trees and Graphs', description: 'Advanced tree and graph algorithms with complexity analysis', author: 'Priya Singh', date: '2024-01-10', type: 'Tutorial', downloads: 189, upvotes: 22 }
                    ],
                    'Database Management Systems': [
                        { id: 3, title: 'SQL Fundamentals', description: 'Complete SQL guide with practical examples', author: 'Amit Kumar', date: '2024-01-12', type: 'Lab Manual', downloads: 156, upvotes: 15 },
                        { id: 4, title: 'Normalization Techniques', description: '1NF to BCNF with real-world examples', author: 'Sneha Patel', date: '2024-01-08', type: 'Formula Sheet', downloads: 98, upvotes: 12 }
                    ],
                    'Computer Networks': [
                        { id: 5, title: 'OSI Model Deep Dive', description: 'Layer-wise explanation with protocols', author: 'Vikram Joshi', date: '2024-01-14', type: 'Lecture Notes', downloads: 134, upvotes: 16 }
                    ]
                }
            },
            4: {
                subjects: {
                    'Machine Learning': [
                        { id: 6, title: 'Linear Regression Mathematics', description: 'Mathematical foundations with Python implementation', author: 'Dr. Anita Desai', date: '2024-01-08', type: 'Lecture Notes', downloads: 267, upvotes: 28, facultyVerified: true }
                    ],
                    'Software Engineering': [
                        { id: 7, title: 'SDLC Models Comparison', description: 'Waterfall vs Agile vs DevOps methodologies', author: 'Rajesh Gupta', date: '2024-01-09', type: 'Tutorial', downloads: 145, upvotes: 19 }
                    ]
                }
            }
        }
    },
    entc: {
        name: 'Electronics and Telecommunication (ENTC)',
        semesters: {
            3: {
                subjects: {
                    'Signals and Systems': [
                        { id: 8, title: 'Fourier Transform Applications', description: 'Mathematical analysis of continuous and discrete signals', author: 'Prof. Suresh Patil', date: '2024-01-11', type: 'Lecture Notes', downloads: 198, upvotes: 24, facultyVerified: true },
                        { id: 9, title: 'Laplace Transform Problems', description: 'Solved examples and practice problems', author: 'Meera Joshi', date: '2024-01-13', type: 'Tutorial', downloads: 167, upvotes: 20 }
                    ],
                    'Digital Electronics': [
                        { id: 10, title: 'Boolean Algebra Simplification', description: 'K-maps and Quine-McCluskey method', author: 'Arjun Sharma', date: '2024-01-10', type: 'Formula Sheet', downloads: 123, upvotes: 14 }
                    ]
                }
            },
            4: {
                subjects: {
                    'Digital Signal Processing': [
                        { id: 11, title: 'FFT Algorithm Implementation', description: 'MATLAB code and theoretical background', author: 'Kavya Nair', date: '2024-01-09', type: 'Lab Manual', downloads: 156, upvotes: 18 }
                    ],
                    'Communication Systems': [
                        { id: 12, title: 'Modulation Techniques', description: 'AM, FM, PM with waveform analysis', author: 'Rohit Kumar', date: '2024-01-12', type: 'Lecture Notes', downloads: 189, upvotes: 22 }
                    ]
                }
            }
        }
    },
    electrical: {
        name: 'Electrical Engineering',
        semesters: {
            3: {
                subjects: {
                    'Power Systems': [
                        { id: 13, title: 'Load Flow Analysis', description: 'Newton-Raphson and Gauss-Seidel methods', author: 'Dr. Prakash Mehta', date: '2024-01-14', type: 'Lecture Notes', downloads: 145, upvotes: 17, facultyVerified: true }
                    ],
                    'Control Systems': [
                        { id: 14, title: 'Root Locus Techniques', description: 'Stability analysis using root locus plots', author: 'Neha Agarwal', date: '2024-01-11', type: 'Tutorial', downloads: 134, upvotes: 16 }
                    ]
                }
            },
            4: {
                subjects: {
                    'Power Electronics': [
                        { id: 15, title: 'Converter Circuits', description: 'AC-DC and DC-DC converter analysis', author: 'Sanjay Kulkarni', date: '2024-01-13', type: 'Lab Manual', downloads: 167, upvotes: 19 }
                    ]
                }
            }
        }
    },
    instrumentation: {
        name: 'Instrumentation and Control Engineering',
        semesters: {
            3: {
                subjects: {
                    'Process Control': [
                        { id: 16, title: 'PID Controller Tuning', description: 'Ziegler-Nichols and other tuning methods', author: 'Priya Deshmukh', date: '2024-01-12', type: 'Lecture Notes', downloads: 123, upvotes: 15 }
                    ],
                    'Industrial Instrumentation': [
                        { id: 17, title: 'Sensor Calibration Techniques', description: 'Temperature, pressure, and flow sensors', author: 'Anil Jain', date: '2024-01-10', type: 'Lab Manual', downloads: 98, upvotes: 12 }
                    ]
                }
            }
        }
    },
    mechanical: {
        name: 'Mechanical Engineering',
        semesters: {
            3: {
                subjects: {
                    'Thermodynamics': [
                        { id: 18, title: 'First Law Applications', description: 'Energy conservation in closed and open systems', author: 'Prof. Vikram Joshi', date: '2024-01-14', type: 'Lecture Notes', downloads: 234, upvotes: 26, facultyVerified: true },
                        { id: 19, title: 'Steam Tables Usage', description: 'Property calculations using steam tables', author: 'Anita Desai', date: '2024-01-11', type: 'Formula Sheet', downloads: 178, upvotes: 21 }
                    ],
                    'Fluid Mechanics': [
                        { id: 20, title: 'Bernoulli Equation Applications', description: 'Flow analysis in pipes and channels', author: 'Ravi Gupta', date: '2024-01-13', type: 'Tutorial', downloads: 156, upvotes: 18 }
                    ],
                    'Strength of Materials': [
                        { id: 21, title: 'Stress-Strain Analysis', description: 'Axial, bending, and torsional stress calculations', author: 'Deepak Singh', date: '2024-01-09', type: 'Lecture Notes', downloads: 189, upvotes: 23 }
                    ]
                }
            },
            4: {
                subjects: {
                    'Heat Transfer': [
                        { id: 22, title: 'Conduction Heat Transfer', description: 'Fourier law and thermal conductivity', author: 'Sunita Sharma', date: '2024-01-08', type: 'Lecture Notes', downloads: 145, upvotes: 17 }
                    ]
                }
            }
        }
    },
    aiml: {
        name: 'Artificial Intelligence & Machine Learning (AIML)',
        semesters: {
            3: {
                subjects: {
                    'Machine Learning Fundamentals': [
                        { id: 23, title: 'Supervised Learning Algorithms', description: 'Linear regression, SVM, decision trees', author: 'Dr. Rahul Patil', date: '2024-01-15', type: 'Lecture Notes', downloads: 298, upvotes: 32, facultyVerified: true }
                    ],
                    'Data Structures for AI': [
                        { id: 24, title: 'Graph Algorithms for AI', description: 'BFS, DFS, A* search algorithms', author: 'Kavita Nair', date: '2024-01-12', type: 'Tutorial', downloads: 167, upvotes: 19 }
                    ]
                }
            },
            4: {
                subjects: {
                    'Deep Learning': [
                        { id: 25, title: 'Neural Network Architectures', description: 'CNN, RNN, LSTM implementations', author: 'Arjun Mehta', date: '2024-01-10', type: 'Lab Manual', downloads: 234, upvotes: 28 }
                    ]
                }
            }
        }
    },
    manufacturing: {
        name: 'Manufacturing Science and Engineering',
        semesters: {
            3: {
                subjects: {
                    'Manufacturing Processes': [
                        { id: 26, title: 'Machining Operations', description: 'Turning, milling, drilling processes', author: 'Prof. Sunil Joshi', date: '2024-01-13', type: 'Lecture Notes', downloads: 145, upvotes: 16, facultyVerified: true }
                    ],
                    'Quality Control': [
                        { id: 27, title: 'Statistical Process Control', description: 'Control charts and process capability', author: 'Meera Kulkarni', date: '2024-01-11', type: 'Tutorial', downloads: 123, upvotes: 14 }
                    ]
                }
            }
        }
    },
    civil: {
        name: 'Civil Engineering',
        semesters: {
            3: {
                subjects: {
                    'Structural Analysis': [
                        { id: 28, title: 'Method of Joints', description: 'Truss analysis using equilibrium equations', author: 'Dr. Rajesh Patil', date: '2024-01-14', type: 'Lecture Notes', downloads: 178, upvotes: 20, facultyVerified: true }
                    ],
                    'Concrete Technology': [
                        { id: 29, title: 'Mix Design Procedures', description: 'IS code methods for concrete mix design', author: 'Priya Sharma', date: '2024-01-12', type: 'Lab Manual', downloads: 156, upvotes: 18 }
                    ]
                }
            },
            4: {
                subjects: {
                    'Foundation Engineering': [
                        { id: 30, title: 'Bearing Capacity Calculations', description: 'Shallow and deep foundation design', author: 'Anil Kumar', date: '2024-01-09', type: 'Tutorial', downloads: 134, upvotes: 15 }
                    ]
                }
            }
        }
    },
    metallurgy: {
        name: 'Metallurgy and Materials Engineering',
        semesters: {
            3: {
                subjects: {
                    'Physical Metallurgy': [
                        { id: 31, title: 'Phase Diagrams', description: 'Binary and ternary phase diagram analysis', author: 'Prof. Santosh Jain', date: '2024-01-13', type: 'Lecture Notes', downloads: 123, upvotes: 14, facultyVerified: true }
                    ],
                    'Materials Characterization': [
                        { id: 32, title: 'XRD Analysis Techniques', description: 'X-ray diffraction for crystal structure', author: 'Neha Agarwal', date: '2024-01-11', type: 'Lab Manual', downloads: 98, upvotes: 11 }
                    ]
                }
            }
        }
    }
};

let currentNotesPath = { branch: null, semester: null, subject: null };

// Notes Modal Management
function initializeNotesModal() {
    const notesModal = document.getElementById('notesModal');
    const notesCloseBtn = notesModal?.querySelector('.notes-close-btn');
    const notesTabs = notesModal?.querySelectorAll('.notes-tab-btn');
    const uploadNotesForm = document.getElementById('uploadNotesForm');
    const uploadCancelBtn = document.getElementById('uploadCancelBtn');
    const notesSearchInput = document.getElementById('notesSearchInput');

    if (notesCloseBtn) {
        notesCloseBtn.addEventListener('click', hideNotesModal);
    }

    notesTabs?.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchNotesTab(tabName);
        });
    });

    if (uploadNotesForm) {
        uploadNotesForm.addEventListener('submit', handleNotesUpload);
    }

    if (uploadCancelBtn) {
        uploadCancelBtn.addEventListener('click', hideNotesModal);
    }

    if (notesSearchInput) {
        notesSearchInput.addEventListener('input', searchNotes);
    }

    // File upload display
    const uploadFile = document.getElementById('uploadFile');
    if (uploadFile) {
        uploadFile.addEventListener('change', handleFileUploadDisplay);
    }

    if (notesModal) {
        notesModal.addEventListener('click', (e) => {
            if (e.target === notesModal) hideNotesModal();
        });
    }
}

function showNotesModal() {
    const notesModal = document.getElementById('notesModal');
    if (notesModal) {
        notesModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        resetNotesNavigation();
        displayBranches();
    }
}

function hideNotesModal() {
    const notesModal = document.getElementById('notesModal');
    if (notesModal) {
        notesModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function switchNotesTab(tabName) {
    const tabs = document.querySelectorAll('.notes-tab-btn');
    const contents = document.querySelectorAll('.notes-tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}Tab`);

    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.classList.add('active');

    if (tabName === 'browse') {
        resetNotesNavigation();
        displayBranches();
    }
}

function resetNotesNavigation() {
    currentNotesPath = { branch: null, semester: null, subject: null };
    const notesList = document.getElementById('notesList');
    const notesGrid = document.getElementById('notesGrid');
    
    if (notesList) notesList.classList.add('hidden');
    if (notesGrid) notesGrid.classList.remove('hidden');
    
    updateBreadcrumb();
}

function updateBreadcrumb() {
    const breadcrumb = document.getElementById('notesBreadcrumb');
    if (!breadcrumb) return;

    let breadcrumbHTML = '';
    
    if (!currentNotesPath.branch) {
        breadcrumbHTML = '<span class="breadcrumb-item active" data-level="branch">Select Branch</span>';
    } else {
        breadcrumbHTML += `<span class="breadcrumb-item" data-level="branch" onclick="navigateToLevel('branch')">${notesData[currentNotesPath.branch].name}</span>`;
        
        if (!currentNotesPath.semester) {
            breadcrumbHTML += '<span class="breadcrumb-item active" data-level="semester">Select Semester</span>';
        } else {
            breadcrumbHTML += `<span class="breadcrumb-item" data-level="semester" onclick="navigateToLevel('semester')">Semester ${currentNotesPath.semester}</span>`;
            
            if (!currentNotesPath.subject) {
                breadcrumbHTML += '<span class="breadcrumb-item active" data-level="subject">Select Subject</span>';
            } else {
                breadcrumbHTML += `<span class="breadcrumb-item active" data-level="notes">${currentNotesPath.subject}</span>`;
            }
        }
    }
    
    breadcrumb.innerHTML = breadcrumbHTML;
}

function navigateToLevel(level) {
    if (level === 'branch') {
        resetNotesNavigation();
        displayBranches();
    } else if (level === 'semester') {
        currentNotesPath.semester = null;
        currentNotesPath.subject = null;
        displaySemesters(currentNotesPath.branch);
    }
}

function displayBranches() {
    const notesGrid = document.getElementById('notesGrid');
    if (!notesGrid) return;

    const branchesHTML = Object.keys(notesData).map(branchKey => {
        const branch = notesData[branchKey];
        const semesterCount = Object.keys(branch.semesters).length;
        
        return `
            <div class="notes-card" onclick="selectBranch('${branchKey}')">
                <div class="notes-card-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="notes-card-title">${branch.name}</div>
                <div class="notes-card-count">${semesterCount} Semester${semesterCount > 1 ? 's' : ''}</div>
            </div>
        `;
    }).join('');

    notesGrid.innerHTML = branchesHTML;
}

function selectBranch(branchKey) {
    currentNotesPath.branch = branchKey;
    updateBreadcrumb();
    displaySemesters(branchKey);
}

function displaySemesters(branchKey) {
    const notesGrid = document.getElementById('notesGrid');
    if (!notesGrid || !notesData[branchKey]) return;

    const semesters = notesData[branchKey].semesters;
    const semestersHTML = Object.keys(semesters).map(semesterKey => {
        const subjectCount = Object.keys(semesters[semesterKey].subjects).length;
        
        return `
            <div class="notes-card" onclick="selectSemester('${semesterKey}')">
                <div class="notes-card-icon">
                    <i class="fas fa-book"></i>
                </div>
                <div class="notes-card-title">Semester ${semesterKey}</div>
                <div class="notes-card-count">${subjectCount} Subject${subjectCount > 1 ? 's' : ''}</div>
            </div>
        `;
    }).join('');

    notesGrid.innerHTML = semestersHTML;
}

function selectSemester(semesterKey) {
    currentNotesPath.semester = semesterKey;
    updateBreadcrumb();
    displaySubjects(currentNotesPath.branch, semesterKey);
}

function displaySubjects(branchKey, semesterKey) {
    const notesGrid = document.getElementById('notesGrid');
    if (!notesGrid || !notesData[branchKey]?.semesters[semesterKey]) return;

    const subjects = notesData[branchKey].semesters[semesterKey].subjects;
    const subjectsHTML = Object.keys(subjects).map(subjectKey => {
        const notesCount = subjects[subjectKey].length;
        
        return `
            <div class="notes-card" onclick="selectSubject('${subjectKey}')">
                <div class="notes-card-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="notes-card-title">${subjectKey}</div>
                <div class="notes-card-count">${notesCount} Note${notesCount > 1 ? 's' : ''}</div>
            </div>
        `;
    }).join('');

    notesGrid.innerHTML = subjectsHTML;
}

function selectSubject(subjectKey) {
    currentNotesPath.subject = subjectKey;
    updateBreadcrumb();
    displayNotes(currentNotesPath.branch, currentNotesPath.semester, subjectKey);
}

function displayNotes(branchKey, semesterKey, subjectKey) {
    const notesGrid = document.getElementById('notesGrid');
    const notesList = document.getElementById('notesList');
    const notesListTitle = document.getElementById('notesListTitle');
    const notesItems = document.getElementById('notesItems');
    
    if (notesGrid) notesGrid.classList.add('hidden');
    if (notesList) notesList.classList.remove('hidden');
    if (notesListTitle) notesListTitle.textContent = `${subjectKey} Notes`;
    
    const notes = notesData[branchKey]?.semesters[semesterKey]?.subjects[subjectKey] || [];
    
    if (notesItems) {
        notesItems.innerHTML = notes.map(note => `
            <div class="note-item">
                <div class="note-header">
                    <div>
                        <div class="note-title">
                            ${note.title}
                            ${note.facultyVerified ? '<i class="fas fa-check-circle" style="color: #10b981; margin-left: 0.5rem;" title="Faculty Verified"></i>' : ''}
                        </div>
                        <div class="note-subject">${subjectKey}</div>
                    </div>
                    <div class="note-type">${note.type}</div>
                </div>
                <div class="note-description">${note.description}</div>
                <div class="note-stats">
                    <div class="note-stat">
                        <i class="fas fa-download"></i>
                        <span>${note.downloads} downloads</span>
                    </div>
                    <div class="note-stat">
                        <i class="fas fa-thumbs-up"></i>
                        <span>${note.upvotes} upvotes</span>
                    </div>
                </div>
                <div class="note-meta">
                    <div class="note-author">
                        <i class="fas fa-user"></i>
                        <span>${note.author}</span>
                        ${note.facultyVerified ? '<span class="faculty-badge">Faculty</span>' : ''}
                    </div>
                    <div class="note-date">
                        <i class="fas fa-calendar"></i>
                        <span>${new Date(note.date).toLocaleDateString()}</span>
                    </div>
                    <div class="note-actions">
                        <button class="upvote-btn" onclick="upvoteNote(${note.id})" title="Upvote this note">
                            <i class="fas fa-thumbs-up"></i>
                        </button>
                        <button class="download-btn" onclick="downloadNote(${note.id})">
                            <i class="fas fa-download"></i>
                            Download
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function searchNotes() {
    const searchTerm = document.getElementById('notesSearchInput')?.value.toLowerCase() || '';
    const noteItems = document.querySelectorAll('.note-item');
    
    noteItems.forEach(item => {
        const title = item.querySelector('.note-title')?.textContent.toLowerCase() || '';
        const description = item.querySelector('.note-description')?.textContent.toLowerCase() || '';
        const author = item.querySelector('.note-author span')?.textContent.toLowerCase() || '';
        
        const matches = title.includes(searchTerm) || description.includes(searchTerm) || author.includes(searchTerm);
        item.style.display = matches ? 'block' : 'none';
    });
}

function downloadNote(noteId) {
    showNotification('Downloading note...', 'info');
    setTimeout(() => {
        showNotification('Note downloaded successfully!', 'success');
        // Simulate download count increment
        updateNoteDownloadCount(noteId);
    }, 1000);
}

function upvoteNote(noteId) {
    showNotification('Note upvoted!', 'success');
    // Simulate upvote count increment
    updateNoteUpvoteCount(noteId);
}

function updateNoteDownloadCount(noteId) {
    // In a real application, this would update the database
    // For demo purposes, we'll just log the action
    console.log(`Note ${noteId} download count incremented`);
}

function updateNoteUpvoteCount(noteId) {
    // In a real application, this would update the database
    // For demo purposes, we'll just log the action
    console.log(`Note ${noteId} upvote count incremented`);
}

function handleNotesUpload(event) {
    event.preventDefault();
    showNotification('Uploading notes...', 'info');
    setTimeout(() => {
        showNotification('Notes uploaded successfully!', 'success');
        hideNotesModal();
        document.getElementById('uploadNotesForm')?.reset();
    }, 2000);
}

function handleFileUploadDisplay(event) {
    const file = event.target.files[0];
    const display = event.target.parentElement.querySelector('.file-upload-display span');
    
    if (file && display) {
        display.textContent = `Selected: ${file.name}`;
        display.style.color = '#10b981';
    }
}

// COEP Tech B.Tech Past Papers Data Structure
const papersData = {
    cse: {
        name: 'Computer Science and Engineering (CSE)',
        semesters: {
            3: {
                subjects: {
                    'Data Structures and Algorithms': [
                        { id: 1, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-15', hasSolutions: true },
                        { id: 2, year: '2023', type: 'midsem', duration: '1.5 hours', uploadedBy: 'Student', uploadDate: '2024-01-10', hasSolutions: false },
                        { id: 3, year: '2022', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-08', hasSolutions: true }
                    ],
                    'Database Management Systems': [
                        { id: 4, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-12', hasSolutions: true },
                        { id: 5, year: '2022', type: 'midsem', duration: '2 hours', uploadedBy: 'Student', uploadDate: '2024-01-09', hasSolutions: false }
                    ],
                    'Computer Networks': [
                        { id: 6, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-11', hasSolutions: true }
                    ]
                }
            },
            4: {
                subjects: {
                    'Machine Learning': [
                        { id: 7, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-08', hasSolutions: true },
                        { id: 8, year: '2022', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-07', hasSolutions: false }
                    ],
                    'Software Engineering': [
                        { id: 9, year: '2023', type: 'midsem', duration: '2 hours', uploadedBy: 'Student', uploadDate: '2024-01-06', hasSolutions: false }
                    ]
                }
            }
        }
    },
    entc: {
        name: 'Electronics and Telecommunication (ENTC)',
        semesters: {
            3: {
                subjects: {
                    'Signals and Systems': [
                        { id: 10, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-14', hasSolutions: true },
                        { id: 11, year: '2022', type: 'midsem', duration: '2 hours', uploadedBy: 'Student', uploadDate: '2024-01-13', hasSolutions: false }
                    ],
                    'Digital Electronics': [
                        { id: 12, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-12', hasSolutions: true }
                    ]
                }
            },
            4: {
                subjects: {
                    'Digital Signal Processing': [
                        { id: 13, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-11', hasSolutions: true }
                    ],
                    'Communication Systems': [
                        { id: 14, year: '2022', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-10', hasSolutions: false }
                    ]
                }
            }
        }
    },
    electrical: {
        name: 'Electrical Engineering',
        semesters: {
            3: {
                subjects: {
                    'Power Systems': [
                        { id: 15, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-14', hasSolutions: true }
                    ],
                    'Control Systems': [
                        { id: 16, year: '2023', type: 'midsem', duration: '2 hours', uploadedBy: 'Student', uploadDate: '2024-01-13', hasSolutions: false }
                    ]
                }
            },
            4: {
                subjects: {
                    'Power Electronics': [
                        { id: 17, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-12', hasSolutions: true }
                    ]
                }
            }
        }
    },
    instrumentation: {
        name: 'Instrumentation and Control Engineering',
        semesters: {
            3: {
                subjects: {
                    'Process Control': [
                        { id: 18, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-11', hasSolutions: true }
                    ],
                    'Industrial Instrumentation': [
                        { id: 19, year: '2022', type: 'midsem', duration: '2 hours', uploadedBy: 'Student', uploadDate: '2024-01-10', hasSolutions: false }
                    ]
                }
            }
        }
    },
    mechanical: {
        name: 'Mechanical Engineering',
        semesters: {
            3: {
                subjects: {
                    'Thermodynamics': [
                        { id: 20, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-14', hasSolutions: true },
                        { id: 21, year: '2022', type: 'midsem', duration: '2 hours', uploadedBy: 'Student', uploadDate: '2024-01-11', hasSolutions: false },
                        { id: 22, year: '2021', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-09', hasSolutions: true }
                    ],
                    'Fluid Mechanics': [
                        { id: 23, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-13', hasSolutions: true }
                    ],
                    'Strength of Materials': [
                        { id: 24, year: '2023', type: 'midsem', duration: '2 hours', uploadedBy: 'Student', uploadDate: '2024-01-12', hasSolutions: false }
                    ]
                }
            },
            4: {
                subjects: {
                    'Heat Transfer': [
                        { id: 25, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-10', hasSolutions: true }
                    ]
                }
            }
        }
    },
    aiml: {
        name: 'Artificial Intelligence & Machine Learning (AIML)',
        semesters: {
            3: {
                subjects: {
                    'Machine Learning Fundamentals': [
                        { id: 26, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-15', hasSolutions: true }
                    ],
                    'Data Structures for AI': [
                        { id: 27, year: '2023', type: 'midsem', duration: '2 hours', uploadedBy: 'Student', uploadDate: '2024-01-14', hasSolutions: false }
                    ]
                }
            },
            4: {
                subjects: {
                    'Deep Learning': [
                        { id: 28, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-13', hasSolutions: true }
                    ]
                }
            }
        }
    },
    manufacturing: {
        name: 'Manufacturing Science and Engineering',
        semesters: {
            3: {
                subjects: {
                    'Manufacturing Processes': [
                        { id: 29, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-12', hasSolutions: true }
                    ],
                    'Quality Control': [
                        { id: 30, year: '2022', type: 'midsem', duration: '2 hours', uploadedBy: 'Student', uploadDate: '2024-01-11', hasSolutions: false }
                    ]
                }
            }
        }
    },
    civil: {
        name: 'Civil Engineering',
        semesters: {
            3: {
                subjects: {
                    'Structural Analysis': [
                        { id: 31, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-14', hasSolutions: true }
                    ],
                    'Concrete Technology': [
                        { id: 32, year: '2023', type: 'midsem', duration: '2 hours', uploadedBy: 'Student', uploadDate: '2024-01-13', hasSolutions: false }
                    ]
                }
            },
            4: {
                subjects: {
                    'Foundation Engineering': [
                        { id: 33, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-12', hasSolutions: true }
                    ]
                }
            }
        }
    },
    metallurgy: {
        name: 'Metallurgy and Materials Engineering',
        semesters: {
            3: {
                subjects: {
                    'Physical Metallurgy': [
                        { id: 34, year: '2023', type: 'endsem', duration: '3 hours', uploadedBy: 'Admin', uploadDate: '2024-01-11', hasSolutions: true }
                    ],
                    'Materials Characterization': [
                        { id: 35, year: '2022', type: 'midsem', duration: '2 hours', uploadedBy: 'Student', uploadDate: '2024-01-10', hasSolutions: false }
                    ]
                }
            }
        }
    }
};

let currentPapersPath = { branch: null, semester: null, subject: null };

// Papers Modal Management
function initializePapersModal() {
    const papersModal = document.getElementById('papersModal');
    const papersCloseBtn = papersModal?.querySelector('.papers-close-btn');
    const papersTabs = papersModal?.querySelectorAll('.papers-tab-btn');
    const uploadPaperForm = document.getElementById('uploadPaperForm');
    const paperCancelBtn = document.getElementById('paperCancelBtn');
    const yearFilter = document.getElementById('yearFilter');
    const examTypeFilter = document.getElementById('examTypeFilter');

    if (papersCloseBtn) {
        papersCloseBtn.addEventListener('click', hidePapersModal);
    }

    papersTabs?.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchPapersTab(tabName);
        });
    });

    if (uploadPaperForm) {
        uploadPaperForm.addEventListener('submit', handlePaperUpload);
    }

    if (paperCancelBtn) {
        paperCancelBtn.addEventListener('click', hidePapersModal);
    }

    if (yearFilter) {
        yearFilter.addEventListener('change', filterPapers);
    }

    if (examTypeFilter) {
        examTypeFilter.addEventListener('change', filterPapers);
    }

    // File upload display
    const paperFile = document.getElementById('paperFile');
    if (paperFile) {
        paperFile.addEventListener('change', handlePaperFileDisplay);
    }

    if (papersModal) {
        papersModal.addEventListener('click', (e) => {
            if (e.target === papersModal) hidePapersModal();
        });
    }
}

function showPapersModal() {
    const papersModal = document.getElementById('papersModal');
    if (papersModal) {
        papersModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        resetPapersNavigation();
        displayPapersBranches();
    }
}

function hidePapersModal() {
    const papersModal = document.getElementById('papersModal');
    if (papersModal) {
        papersModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function switchPapersTab(tabName) {
    const tabs = document.querySelectorAll('.papers-tab-btn');
    const contents = document.querySelectorAll('.papers-tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}PapersTab`);

    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.classList.add('active');

    if (tabName === 'browse') {
        resetPapersNavigation();
        displayPapersBranches();
    }
}

function resetPapersNavigation() {
    currentPapersPath = { branch: null, semester: null, subject: null };
    const papersList = document.getElementById('papersList');
    const papersGrid = document.getElementById('papersGrid');
    
    if (papersList) papersList.classList.add('hidden');
    if (papersGrid) papersGrid.classList.remove('hidden');
    
    updatePapersBreadcrumb();
}

function updatePapersBreadcrumb() {
    const breadcrumb = document.getElementById('papersBreadcrumb');
    if (!breadcrumb) return;

    let breadcrumbHTML = '';
    
    if (!currentPapersPath.branch) {
        breadcrumbHTML = '<span class="breadcrumb-item active" data-level="branch">Select Branch</span>';
    } else {
        breadcrumbHTML += `<span class="breadcrumb-item" data-level="branch" onclick="navigateToPapersLevel('branch')">${papersData[currentPapersPath.branch].name}</span>`;
        
        if (!currentPapersPath.semester) {
            breadcrumbHTML += '<span class="breadcrumb-item active" data-level="semester">Select Semester</span>';
        } else {
            breadcrumbHTML += `<span class="breadcrumb-item" data-level="semester" onclick="navigateToPapersLevel('semester')">Semester ${currentPapersPath.semester}</span>`;
            
            if (!currentPapersPath.subject) {
                breadcrumbHTML += '<span class="breadcrumb-item active" data-level="subject">Select Subject</span>';
            } else {
                breadcrumbHTML += `<span class="breadcrumb-item active" data-level="papers">${currentPapersPath.subject}</span>`;
            }
        }
    }
    
    breadcrumb.innerHTML = breadcrumbHTML;
}

function navigateToPapersLevel(level) {
    if (level === 'branch') {
        resetPapersNavigation();
        displayPapersBranches();
    } else if (level === 'semester') {
        currentPapersPath.semester = null;
        currentPapersPath.subject = null;
        displayPapersSemesters(currentPapersPath.branch);
    }
}

function displayPapersBranches() {
    const papersGrid = document.getElementById('papersGrid');
    if (!papersGrid) return;

    const branchesHTML = Object.keys(papersData).map(branchKey => {
        const branch = papersData[branchKey];
        const semesterCount = Object.keys(branch.semesters).length;
        
        return `
            <div class="papers-card" onclick="selectPapersBranch('${branchKey}')">
                <div class="papers-card-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="papers-card-title">${branch.name}</div>
                <div class="papers-card-count">${semesterCount} Semester${semesterCount > 1 ? 's' : ''}</div>
            </div>
        `;
    }).join('');

    papersGrid.innerHTML = branchesHTML;
}

function selectPapersBranch(branchKey) {
    currentPapersPath.branch = branchKey;
    updatePapersBreadcrumb();
    displayPapersSemesters(branchKey);
}

function displayPapersSemesters(branchKey) {
    const papersGrid = document.getElementById('papersGrid');
    if (!papersGrid || !papersData[branchKey]) return;

    const semesters = papersData[branchKey].semesters;
    const semestersHTML = Object.keys(semesters).map(semesterKey => {
        const subjectCount = Object.keys(semesters[semesterKey].subjects).length;
        
        return `
            <div class="papers-card" onclick="selectPapersSemester('${semesterKey}')">
                <div class="papers-card-icon">
                    <i class="fas fa-book"></i>
                </div>
                <div class="papers-card-title">Semester ${semesterKey}</div>
                <div class="papers-card-count">${subjectCount} Subject${subjectCount > 1 ? 's' : ''}</div>
            </div>
        `;
    }).join('');

    papersGrid.innerHTML = semestersHTML;
}

function selectPapersSemester(semesterKey) {
    currentPapersPath.semester = semesterKey;
    updatePapersBreadcrumb();
    displayPapersSubjects(currentPapersPath.branch, semesterKey);
}

function displayPapersSubjects(branchKey, semesterKey) {
    const papersGrid = document.getElementById('papersGrid');
    if (!papersGrid || !papersData[branchKey]?.semesters[semesterKey]) return;

    const subjects = papersData[branchKey].semesters[semesterKey].subjects;
    const subjectsHTML = Object.keys(subjects).map(subjectKey => {
        const papersCount = subjects[subjectKey].length;
        
        return `
            <div class="papers-card" onclick="selectPapersSubject('${subjectKey}')">
                <div class="papers-card-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="papers-card-title">${subjectKey}</div>
                <div class="papers-card-count">${papersCount} Paper${papersCount > 1 ? 's' : ''}</div>
            </div>
        `;
    }).join('');

    papersGrid.innerHTML = subjectsHTML;
}

function selectPapersSubject(subjectKey) {
    currentPapersPath.subject = subjectKey;
    updatePapersBreadcrumb();
    displayExamPapers(currentPapersPath.branch, currentPapersPath.semester, subjectKey);
}

function displayExamPapers(branchKey, semesterKey, subjectKey) {
    const papersGrid = document.getElementById('papersGrid');
    const papersList = document.getElementById('papersList');
    const papersListTitle = document.getElementById('papersListTitle');
    const papersItems = document.getElementById('papersItems');
    
    if (papersGrid) papersGrid.classList.add('hidden');
    if (papersList) papersList.classList.remove('hidden');
    if (papersListTitle) papersListTitle.textContent = `${subjectKey} - Exam Papers`;
    
    const papers = papersData[branchKey]?.semesters[semesterKey]?.subjects[subjectKey] || [];
    
    if (papersItems) {
        papersItems.innerHTML = papers.map(paper => `
            <div class="paper-item" data-year="${paper.year}" data-type="${paper.type}">
                <div class="paper-header">
                    <div>
                        <div class="paper-title">
                            ${subjectKey} - ${getExamTypeName(paper.type)} ${paper.year}
                            ${paper.hasSolutions ? '<i class="fas fa-check-circle" style="color: #3b82f6; margin-left: 0.5rem;" title="Solutions Available"></i>' : ''}
                        </div>
                        <div class="paper-subject">${subjectKey}</div>
                    </div>
                    <div class="paper-badges">
                        <div class="paper-year">${paper.year}</div>
                        <div class="paper-type">${getExamTypeName(paper.type)}</div>
                        ${paper.hasSolutions ? '<div class="solutions-badge">Solutions</div>' : ''}
                    </div>
                </div>
                <div class="paper-meta">
                    <div class="paper-duration">
                        <i class="fas fa-clock"></i>
                        <span>Duration: ${paper.duration}</span>
                    </div>
                    <div class="paper-actions">
                        <button class="paper-download" onclick="downloadPaper(${paper.id})">
                            <i class="fas fa-download"></i>
                            Download Paper
                        </button>
                        ${paper.hasSolutions ? `<button class="solutions-download" onclick="downloadSolutions(${paper.id})">
                            <i class="fas fa-file-alt"></i>
                            Solutions
                        </button>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function filterPapers() {
    const yearFilter = document.getElementById('yearFilter')?.value || '';
    const typeFilter = document.getElementById('examTypeFilter')?.value || '';
    const paperItems = document.querySelectorAll('.paper-item');
    
    paperItems.forEach(item => {
        const itemYear = item.getAttribute('data-year');
        const itemType = item.getAttribute('data-type');
        
        const matchesYear = !yearFilter || itemYear === yearFilter;
        const matchesType = !typeFilter || itemType === typeFilter;
        
        item.style.display = (matchesYear && matchesType) ? 'block' : 'none';
    });
}

function getExamTypeName(type) {
    const typeMap = {
        'midsem': 'Mid Semester',
        'endsem': 'End Semester',
        'insem': 'In Semester'
    };
    return typeMap[type] || type;
}

function downloadPaper(paperId) {
    showNotification('Downloading exam paper...', 'info');
    setTimeout(() => {
        showNotification('Exam paper downloaded successfully!', 'success');
    }, 1000);
}

function downloadSolutions(paperId) {
    showNotification('Downloading solutions...', 'info');
    setTimeout(() => {
        showNotification('Solutions downloaded successfully!', 'success');
    }, 1000);
}

function handlePaperUpload(event) {
    event.preventDefault();
    showNotification('Uploading exam paper...', 'info');
    setTimeout(() => {
        showNotification('Exam paper uploaded successfully!', 'success');
        hidePapersModal();
        document.getElementById('uploadPaperForm')?.reset();
    }, 2000);
}

function handlePaperFileDisplay(event) {
    const file = event.target.files[0];
    const display = event.target.parentElement.querySelector('.file-upload-display span');
    
    if (file && display) {
        display.textContent = `Selected: ${file.name}`;
        display.style.color = '#3b82f6';
    }
}

// Sample forum discussions data
const forumDiscussions = [
    {
        id: 1,
        title: 'Tips for Final Semester Exams',
        category: 'academic',
        content: 'Hey everyone! Final exams are approaching and I wanted to share some study tips that helped me last semester. Would love to hear your strategies too!',
        author: 'Priya Sharma',
        date: '2024-01-15T10:30:00',
        replies: 12,
        likes: 25,
        tags: ['exams', 'study-tips', 'academic'],
        anonymous: false
    },
    {
        id: 2,
        title: 'Looking for Project Partners - Web Development',
        category: 'tech',
        content: 'I\'m working on a MERN stack project for my final year and looking for 2-3 motivated teammates. The project involves building a student management system.',
        author: 'Anonymous',
        date: '2024-01-14T15:45:00',
        replies: 8,
        likes: 15,
        tags: ['project', 'web-dev', 'team'],
        anonymous: true
    },
    {
        id: 3,
        title: 'TechFest 2024 - Who\'s Participating?',
        category: 'events',
        content: 'Registration for TechFest is open! I\'m planning to participate in the coding competition. Anyone else interested in forming a team?',
        author: 'Rahul Kumar',
        date: '2024-01-13T09:20:00',
        replies: 20,
        likes: 35,
        tags: ['techfest', 'competition', 'coding'],
        anonymous: false
    },
    {
        id: 4,
        title: 'Best Places to Study on Campus',
        category: 'campus',
        content: 'Library is always crowded these days. Can anyone suggest some quiet places on campus for studying? Looking for spots with good WiFi and charging points.',
        author: 'Sneha Patel',
        date: '2024-01-12T14:10:00',
        replies: 15,
        likes: 28,
        tags: ['study-spots', 'campus', 'library'],
        anonymous: false
    },
    {
        id: 5,
        title: 'Placement Interview Experiences',
        category: 'placement',
        content: 'Just completed my interview with TCS. Happy to share my experience and tips for technical rounds. Feel free to ask questions!',
        author: 'Amit Singh',
        date: '2024-01-11T16:30:00',
        replies: 30,
        likes: 45,
        tags: ['placement', 'interview', 'tcs'],
        anonymous: false
    }
];

const sampleReplies = {
    1: [
        { author: 'Vikram Joshi', content: 'Great tips! I also recommend making summary notes for quick revision.', date: '2024-01-15T11:00:00' },
        { author: 'Anonymous', content: 'Thanks for sharing! The Pomodoro technique really works for me.', date: '2024-01-15T12:15:00' }
    ],
    2: [
        { author: 'Ravi Gupta', content: 'I\'m interested! I have experience with React and Node.js.', date: '2024-01-14T16:00:00' },
        { author: 'Anita Desai', content: 'Count me in! I can handle the backend development.', date: '2024-01-14T17:30:00' }
    ]
};

// Forum Modal Management
function initializeForumModal() {
    const forumModal = document.getElementById('forumModal');
    const forumCloseBtn = forumModal?.querySelector('.forum-close-btn');
    const forumTabs = forumModal?.querySelectorAll('.forum-tab-btn');
    const createPostForm = document.getElementById('createPostForm');
    const postCancelBtn = document.getElementById('postCancelBtn');
    
    // Discussion detail modal
    const discussionModal = document.getElementById('discussionModal');
    const discussionCloseBtn = discussionModal?.querySelector('.discussion-close-btn');
    const discussionBackBtn = discussionModal?.querySelector('.discussion-back-btn');
    const submitReplyBtn = document.getElementById('submitReply');

    if (forumCloseBtn) {
        forumCloseBtn.addEventListener('click', hideForumModal);
    }

    forumTabs?.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchForumTab(tabName);
        });
    });

    if (createPostForm) {
        createPostForm.addEventListener('submit', handlePostCreation);
    }

    if (postCancelBtn) {
        postCancelBtn.addEventListener('click', hideForumModal);
    }

    // Discussion modal handlers
    if (discussionCloseBtn) {
        discussionCloseBtn.addEventListener('click', hideDiscussionModal);
    }

    if (discussionBackBtn) {
        discussionBackBtn.addEventListener('click', () => {
            hideDiscussionModal();
            showForumModal();
        });
    }

    if (submitReplyBtn) {
        submitReplyBtn.addEventListener('click', handleReplySubmission);
    }

    // Filters
    const filters = ['categoryFilter', 'sortFilter', 'searchPosts'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', filterDiscussions);
            filter.addEventListener('input', filterDiscussions);
        }
    });

    if (forumModal) {
        forumModal.addEventListener('click', (e) => {
            if (e.target === forumModal) hideForumModal();
        });
    }

    if (discussionModal) {
        discussionModal.addEventListener('click', (e) => {
            if (e.target === discussionModal) hideDiscussionModal();
        });
    }
}

function showForumModal() {
    const forumModal = document.getElementById('forumModal');
    if (forumModal) {
        forumModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        displayDiscussions();
    }
}

function hideForumModal() {
    const forumModal = document.getElementById('forumModal');
    if (forumModal) {
        forumModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function switchForumTab(tabName) {
    const tabs = document.querySelectorAll('.forum-tab-btn');
    const contents = document.querySelectorAll('.forum-tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}Tab`);

    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

function displayDiscussions() {
    const discussionsList = document.getElementById('discussionsList');
    if (!discussionsList) return;

    discussionsList.innerHTML = forumDiscussions.map(discussion => `
        <div class="discussion-item" onclick="showDiscussion(${discussion.id})">
            <div class="discussion-header">
                <div>
                    <div class="discussion-title">${discussion.title}</div>
                    <div class="discussion-preview">${discussion.content.substring(0, 150)}...</div>
                </div>
                <div class="discussion-category">${getCategoryName(discussion.category)}</div>
            </div>
            <div class="discussion-meta">
                <div class="discussion-author">
                    <i class="fas fa-user"></i>
                    <span>${discussion.author}</span>
                    <span>• ${formatDate(discussion.date)}</span>
                </div>
                <div class="discussion-stats">
                    <div class="stat-item">
                        <i class="fas fa-reply"></i>
                        <span>${discussion.replies}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-heart"></i>
                        <span>${discussion.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function filterDiscussions() {
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const searchTerm = document.getElementById('searchPosts')?.value.toLowerCase() || '';
    
    const filteredDiscussions = forumDiscussions.filter(discussion => {
        const matchesCategory = !categoryFilter || discussion.category === categoryFilter;
        const matchesSearch = !searchTerm || 
            discussion.title.toLowerCase().includes(searchTerm) ||
            discussion.content.toLowerCase().includes(searchTerm);
        
        return matchesCategory && matchesSearch;
    });

    const discussionsList = document.getElementById('discussionsList');
    if (discussionsList) {
        discussionsList.innerHTML = filteredDiscussions.map(discussion => `
            <div class="discussion-item" onclick="showDiscussion(${discussion.id})">
                <div class="discussion-header">
                    <div>
                        <div class="discussion-title">${discussion.title}</div>
                        <div class="discussion-preview">${discussion.content.substring(0, 150)}...</div>
                    </div>
                    <div class="discussion-category">${getCategoryName(discussion.category)}</div>
                </div>
                <div class="discussion-meta">
                    <div class="discussion-author">
                        <i class="fas fa-user"></i>
                        <span>${discussion.author}</span>
                        <span>• ${formatDate(discussion.date)}</span>
                    </div>
                    <div class="discussion-stats">
                        <div class="stat-item">
                            <i class="fas fa-reply"></i>
                            <span>${discussion.replies}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-heart"></i>
                            <span>${discussion.likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function showDiscussion(discussionId) {
    const discussion = forumDiscussions.find(d => d.id === discussionId);
    if (!discussion) return;

    const discussionModal = document.getElementById('discussionModal');
    const mainPost = document.getElementById('mainPost');
    const repliesList = document.getElementById('repliesList');
    
    if (mainPost) {
        mainPost.innerHTML = `
            <div class="post-title">${discussion.title}</div>
            <div class="post-content">${discussion.content}</div>
            <div class="post-tags">
                ${discussion.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
            <div class="discussion-meta">
                <div class="discussion-author">
                    <i class="fas fa-user"></i>
                    <span>${discussion.author}</span>
                    <span>• ${formatDate(discussion.date)}</span>
                </div>
                <div class="discussion-stats">
                    <div class="stat-item">
                        <i class="fas fa-reply"></i>
                        <span>${discussion.replies} replies</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-heart"></i>
                        <span>${discussion.likes} likes</span>
                    </div>
                </div>
            </div>
        `;
    }

    if (repliesList) {
        const replies = sampleReplies[discussionId] || [];
        repliesList.innerHTML = replies.map(reply => `
            <div class="reply-item">
                <div class="reply-author">${reply.author}</div>
                <div class="reply-content">${reply.content}</div>
                <div class="reply-date">${formatDate(reply.date)}</div>
            </div>
        `).join('');
    }

    hideForumModal();
    if (discussionModal) {
        discussionModal.classList.remove('hidden');
        discussionModal.setAttribute('data-discussion-id', discussionId);
    }
}

function hideDiscussionModal() {
    const discussionModal = document.getElementById('discussionModal');
    if (discussionModal) {
        discussionModal.classList.add('hidden');
        document.getElementById('replyContent').value = '';
    }
}

function handlePostCreation(event) {
    event.preventDefault();
    showNotification('Creating discussion post...', 'info');
    setTimeout(() => {
        showNotification('Discussion posted successfully!', 'success');
        hideForumModal();
        document.getElementById('createPostForm')?.reset();
    }, 2000);
}

function handleReplySubmission() {
    const replyContent = document.getElementById('replyContent')?.value;
    if (!replyContent.trim()) {
        showNotification('Please enter a reply', 'error');
        return;
    }
    
    showNotification('Posting reply...', 'info');
    setTimeout(() => {
        showNotification('Reply posted successfully!', 'success');
        document.getElementById('replyContent').value = '';
    }, 1000);
}

function getCategoryName(category) {
    const categoryMap = {
        academic: 'Academic',
        general: 'General',
        events: 'Events',
        tech: 'Tech Talk',
        placement: 'Placements',
        campus: 'Campus Life'
    };
    return categoryMap[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize DOM elements first
    initializeDOMElements();

    // Initialize all features
    initializeNavigation();
    initializeAuthModal();
    initializeComplaintModal();
    initializeLostFoundModal();
    initializeMobileMenu();
    initializeRippleEffects();
    initializeNoticesSection();
    initializeMentorshipModal();
    initializeEventsModal();
    initializeNotesModal();
    initializePapersModal();
    initializeForumModal();
    
    // Show today's events notification
    setTimeout(() => {
        const todayEvents = sampleEvents.filter(event => event.isToday);
        if (todayEvents.length > 0) {
            showNotification(`🎉 ${todayEvents.length} event(s) happening today! Check them out.`, 'info');
        }
    }, 3000);

    // Add event listeners for page navigation
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', showServices);
    }

    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', showHome);
    }

    // Add event listeners for service cards
    if (serviceCards) {
        serviceCards.forEach(card => {
            card.addEventListener('click', handleServiceClick);
            card.addEventListener('mouseenter', handleCardHover);
            card.addEventListener('mouseleave', handleCardLeave);
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Add touch support
    addTouchSupport();

    // Add loading animation
    addLoadingAnimation();

    // Add scroll effects
    addScrollEffects();
});

// Scroll Effects
function addScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for scroll effects
    const elementsToObserve = document.querySelectorAll('.service-card, .feature-item, .contact-item, .notice-item');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
    
    // Update notices display on page load
    updateNoticesDisplay();
}

// Export functions for potential external use
window.JebbyEcosystem = {
    showServices,
    showHome,
    showAuthModal,
    hideAuthModal,
    showNotification
};
