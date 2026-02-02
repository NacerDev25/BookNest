document.addEventListener('DOMContentLoaded', () => {
    const mainHeading = document.getElementById('Main-heading');

    if (mainHeading) {
        // Set tabindex to -1 to make the heading programmatically focusable
        mainHeading.setAttribute('tabindex', '-1');
        
        // Use a more robust focus method for mobile reliability
        setTimeout(() => {
            // Blur any active element first to prevent focus conflicts
            if (document.activeElement) {
                document.activeElement.blur();
            }
            mainHeading.focus();
        }, 150); // Increased delay for mobile browsers
    }

    const backToHomeBtn = document.getElementById('back-to-home-btn');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            // Redirect back to the main page and signal where to return focus
            window.location.href = 'index.html?returnFocus=community-btn';
        });
    }
});
