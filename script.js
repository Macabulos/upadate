// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const toggleText = document.querySelector('.toggle-text');
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleButton(currentTheme);
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        let theme = document.documentElement.getAttribute('data-theme');
        theme = theme === 'light' ? 'dark' : 'light';
        
        // Apply the new theme
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update the toggle button
        updateToggleButton(theme);
    });
    
    function updateToggleButton(theme) {
        if (theme === 'dark') {
            toggleText.textContent = 'Light Mode';
        } else {
            toggleText.textContent = 'Dark Mode';
        }
    }
});