document.addEventListener('DOMContentLoaded', () => {
    // Basic SPA Navigation
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.page-section');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');

            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));
            // Show target section
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Scroll to top on navigation (useful for mobile)
            window.scrollTo(0, 0);
        });
    });

    // Mood Selector Logic
    const moodBtns = document.querySelectorAll('.mood-btn');
    const moodText = document.getElementById('current-mood-text');
    
    const moodDescriptions = {
        'great': 'Страхотно! Продължавай в същия дух!',
        'good': 'Добре. Радвам се, че си позитивен.',
        'neutral': 'Неутрално. Утре може да е по-добре.',
        'bad': 'Лошо. Не забравяй, че имаш подкрепа!',
        'terrible': 'Много лошо. Моля, обърни се към секция SOS или близък човек.'
    };

    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            moodBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            const mood = btn.getAttribute('data-mood');
            moodText.textContent = moodDescriptions[mood];
            
            // Add a small animation effect
            moodText.style.animation = 'none';
            setTimeout(() => {
                moodText.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        });
    });

    // Task Checkbox Logic
    const taskCheckboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
    
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const item = e.target.closest('.task-item');
            const badge = item.querySelector('.badge');
            
            if (e.target.checked) {
                badge.className = 'badge done';
                badge.textContent = 'Готово';
            } else {
                badge.className = 'badge in-progress';
                badge.textContent = 'В процес';
            }
            
            updateProgressBar();
        });
    });

    // Mock Progress Bar Update Logic
    function updateProgressBar() {
        const totalTasks = document.querySelectorAll('.task-item').length;
        const checkedTasks = document.querySelectorAll('.task-item input[type="checkbox"]:checked').length;
        
        let initialProgress = 35; // The base progress from our plan
        let taskProgressContribution = (checkedTasks / totalTasks) * 15; // Tasks account for up to 15% of progress
        
        const newProgress = Math.min(100, Math.round(initialProgress + taskProgressContribution));
        
        const progressBar = document.getElementById('main-progress');
        const progressText = document.querySelector('.progress-text');
        
        if (progressBar && progressText) {
            progressBar.style.width = `${newProgress}%`;
            progressText.textContent = `${newProgress}% завършени цели`;
        }
    }

    // Initialize the progress bar
    updateProgressBar();
});
