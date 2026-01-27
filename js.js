document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById("menu-toggle");
    const sideMenu = document.getElementById("side-menu");
    const pageContainer = document.querySelector(".page-container");
    const mainNavList = document.querySelector(".bottom-nav .nav-list");

    // --- 1. Populate the side menu on page load ---
    // Clone the main navigation to the side menu for mobile use.
    if (mainNavList && sideMenu) {
        const clonedNav = mainNavList.cloneNode(true);
        sideMenu.appendChild(clonedNav);
    }

    // --- 2. Advanced Menu Functionality ---
    const menuBackdrop = document.getElementById("menu-backdrop");
    let isMenuOpen = false; // State variable

    // Function to toggle the menu
    function toggleMenu(show, options = { returnFocus: true }) {
        // Prevent running if the state is already what's requested
        if (show === isMenuOpen) return;

        isMenuOpen = show;
        menuToggle.setAttribute('aria-expanded', isMenuOpen);

        if (isMenuOpen) {
            document.body.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
            pageContainer.inert = true;
            
            // Push state to history for back button functionality
            history.pushState({ menuOpen: true }, '', '#menu');

            // Focus first element
            const firstFocusable = sideMenu.querySelector('a, button');
            if (firstFocusable) setTimeout(() => firstFocusable.focus(), 100);

        } else {
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            pageContainer.inert = false;
            
            // If the closing was triggered by something other than popstate, go back
            if (history.state && history.state.menuOpen) {
                history.back();
            }
            
            // Return focus to the toggle button
            if (options.returnFocus) {
                setTimeout(() => menuToggle.focus(), 0); // Ensure focus happens after any potential navigation
            }
        }
    }

    // --- 3. Event Listeners for Menu ---

    // Toggle button click
    if (menuToggle) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu(!isMenuOpen);
        });
    }

    // Backdrop click to close
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', () => toggleMenu(false));
    }

    // Close menu when a link inside is clicked
    if (sideMenu) {
        sideMenu.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                toggleMenu(false); // Removed { returnFocus: false } to allow focus return
            }
        });
    }

    // Keyboard accessibility: Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu(false);
        }
    });

    // Handle the browser's back button
    window.addEventListener('popstate', (e) => {
        // If the state is null, it means we've gone back from the #menu hash
        if (isMenuOpen && (!e.state || !e.state.menuOpen)) {
            toggleMenu(false);
        }
    });

    // Initial state setup on load
    if (window.location.hash === '#menu') {
        history.replaceState({}, '', window.location.pathname + window.location.search);
    }
    document.body.classList.remove('menu-open');
    isMenuOpen = true; // Set to true so toggleMenu(false) runs correctly
    toggleMenu(false);

    // --- 4. Login Modal Functionality ---
    const profileBtn = document.querySelector('.profile-container');
    const loginModalOverlay = document.getElementById('login-modal-overlay');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const emailInput = document.getElementById('email-input');

    if (profileBtn && loginModalOverlay && closeModalBtn && emailInput) {
        // Function to open the modal
        const openModal = () => {
            loginModalOverlay.classList.add('visible');
            // Set focus to the email input for accessibility
            setTimeout(() => emailInput.focus(), 100);
        };

        // Function to close the modal
        const closeModal = () => {
            loginModalOverlay.classList.remove('visible');
            // Return focus to the profile button that opened the modal.
            // Using a small timeout ensures the focus is set correctly after the browser has processed the display change.
            setTimeout(() => profileBtn.focus(), 0);
        };

        // Event listener to open the modal
        profileBtn.addEventListener('click', openModal);
        profileBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });

        // Event listener to close the modal with the button
        closeModalBtn.addEventListener('click', closeModal);

        // Event listener to close the modal by clicking the overlay
        loginModalOverlay.addEventListener('click', (e) => {
            if (e.target === loginModalOverlay) {
                closeModal();
            }
        });

        // Event listener to close the modal with the Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && loginModalOverlay.style.display === 'flex') {
                closeModal();
            }
        });
    }

    // --- 5. Dark/Light Mode Toggle ---
    const modeToggle = document.getElementById("mode-toggle");
    const modeIcon = modeToggle.querySelector("i");
    const modeText = modeToggle.querySelector("span");

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add("dark-mode");
            modeIcon.className = 'ti ti-sun';
            modeText.textContent = 'Light Mode';
        } else {
            document.body.classList.remove("dark-mode");
            modeIcon.className = 'ti ti-moon';
            modeText.textContent = 'Dark Mode';
        }
    };

    // Function to toggle the theme and save preference
    const toggleTheme = () => {
        const currentThemeIsDark = document.body.classList.contains("dark-mode");
        const newTheme = currentThemeIsDark ? 'light' : 'dark';
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    // Add click event listener
    if (modeToggle) {
        modeToggle.addEventListener("click", toggleTheme);
    }

    // On initial load, check for saved theme
    const savedTheme = localStorage.getItem("theme");
    // Check for user's system preference if no theme is saved
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light'); // Default to light
    }
});