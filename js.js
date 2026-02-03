document.addEventListener('DOMContentLoaded', function() {
    // --- Side Menu Functionality ---
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const menuBackdrop = document.getElementById('menu-backdrop');
    const bottomNav = document.querySelector('.bottom-nav');
    const announcer = document.getElementById('aria-live-announcer');

    // 1. Clone navigation links into the side menu for mobile view
    if (bottomNav && sideMenu) {
        const navList = bottomNav.querySelector('.nav-list');
        if (navList) {
            const clonedNavList = navList.cloneNode(true);
            sideMenu.appendChild(clonedNavList);
        }
    }

    // Function to close the menu
    const closeMenu = () => {
        if (!menuToggle || !document.body.classList.contains('menu-open')) return;
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        if (announcer) announcer.textContent = 'Menu closed';
        menuToggle.focus(); // Return focus to the menu button
    };

    // 2. Handle menu toggle button click
    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMenu();
            } else {
                menuToggle.setAttribute('aria-expanded', 'true');
                document.body.classList.add('menu-open');
                if (announcer) announcer.textContent = 'Menu opened';
                const firstLink = sideMenu.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });
    }

    // 3. Close menu when clicking the backdrop
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', closeMenu);
    }

    // 4. Close menu when the 'Escape' key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
            closeMenu();
        }
    });

    // --- Navigation and Focus Management ---
    const communityBtn = document.getElementById('community-btn');

    if (communityBtn) {
        communityBtn.addEventListener('click', () => {
            window.location.href = 'community.html';
        });
    }

    // Check for focus parameter on page load
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('focus')) {
        const elementToFocusId = urlParams.get('focus');
        const elementToFocus = document.getElementById(elementToFocusId);
        if (elementToFocus) {
            // Remove the focus parameter from the URL to keep it clean
            urlParams.delete('focus');
            const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
            history.replaceState(null, '', newUrl);
            
            elementToFocus.focus();
        }
    }
});
