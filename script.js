// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const toggleText = document.querySelector('.toggle-text');
    const followBtn = document.getElementById('follow-btn');
    const followersCount = document.getElementById('followers-count');
    
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
    
    // Follow button functionality
    // Load saved followers count or use default
    let savedFollowers = localStorage.getItem('followersCount');
    let isFollowing = localStorage.getItem('isFollowing') === 'true';
    
    if (savedFollowers) {
        followersCount.textContent = savedFollowers;
    }
    
    // Update button state based on saved following status
    if (isFollowing) {
        followBtn.classList.add('following');
        followBtn.innerHTML = '<i class="fas fa-user-check"></i><span>Following</span>';
    }
    
    // Follow button click handler
    followBtn.addEventListener('click', function() {
        if (isFollowing) {
            // Unfollow logic
            let currentCount = parseInt(followersCount.textContent);
            if (currentCount > 0) {
                followersCount.textContent = currentCount - 1;
                localStorage.setItem('followersCount', currentCount - 1);
            }
            
            followBtn.classList.remove('following');
            followBtn.innerHTML = '<i class="fas fa-user-plus"></i><span>Follow</span>';
            isFollowing = false;
            localStorage.setItem('isFollowing', 'false');
            
            // Show unfollow notification
            showNotification('You unfollowed John Lester');
        } else {
            // Follow logic
            let currentCount = parseInt(followersCount.textContent);
            followersCount.textContent = currentCount + 1;
            localStorage.setItem('followersCount', currentCount + 1);
            
            followBtn.classList.add('following');
            followBtn.innerHTML = '<i class="fas fa-user-check"></i><span>Following</span>';
            isFollowing = true;
            localStorage.setItem('isFollowing', 'true');
            
            // Show follow notification
            showNotification('You are now following John Lester!');
        }
    });
    
    // Function to show notification
    function showNotification(message) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.follow-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'follow-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--success-color);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Animate out after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
});