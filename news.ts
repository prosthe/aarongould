news.js
// News page functionality
class PROSANews {
    constructor() {
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.init();
    }

    init() {
        this.setupCategoryFilters();
        this.setupCalendar();
        this.setupNewsletter();
    }

    setupCategoryFilters() {
        const categoryTabs = document.querySelectorAll('.category-tab');

        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // In a real app, you would filter news items here
                const category = tab.getAttribute('data-category');
                this.filterNews(category);
            });
        });
    }

    filterNews(category) {
        // This would filter news items in a real application
        console.log('Filtering news by category:', category);
    }

    setupCalendar() {
        this.renderCalendar();

        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
            this.renderCalendar();
        });
    }

    renderCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        const currentMonthElement = document.getElementById('currentMonth');

        if (!calendarGrid || !currentMonthElement) return;

        // Update month header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;

        // Clear calendar
        calendarGrid.innerHTML = '';

        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day-header';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });

        // Get first day of month and number of days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyCell);
        }

        // Add days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            // Mark some days as having events (for demo)
            if (day % 7 === 0 || day % 5 === 0) {
                dayElement.classList.add('has-event');
                dayElement.addEventListener('click', () => {
                    this.showEventsForDay(day);
                });
            }

            calendarGrid.appendChild(dayElement);
        }
    }

    showEventsForDay(day) {
        alert(`Events for ${this.currentMonth + 1}/${day}/${this.currentYear}\n\nCheck the events list below for details.`);
    }

    setupNewsletter() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;

                if (this.validateEmail(email)) {
                    this.subscribeNewsletter(email);
                } else {
                    this.showMessage('Please enter a valid email address', 'error');
                }
            });
        }
    }

    subscribeNewsletter(email) {
        // Show loading state
        const submitBtn = document.querySelector('#newsletterForm button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showMessage('Successfully subscribed to PROSA newsletter!', 'success');
            document.getElementById('newsletterForm').reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showMessage(message, type = 'success') {
        if (window.Utils && typeof window.Utils.showMessage === 'function') {
            window.Utils.showMessage(message, type);
        } else {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 5000);
        }
    }
}

// Initialize news
document.addEventListener('DOMContentLoaded', () => {
    new PROSANews();
});