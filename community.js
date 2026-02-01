document.addEventListener('DOMContentLoaded', () => {
    const mainHeading = document.getElementById('Main-heading');

    if (mainHeading) {
        // Set tabindex to -1 to make the heading programmatically focusable
        mainHeading.setAttribute('tabindex', '-1');
        
        // Set focus to the heading
        mainHeading.focus();
    }

    const backToHomeBtn = document.getElementById('back-to-home-btn');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});
