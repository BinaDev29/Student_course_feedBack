function handleLoginRedirect(userRole) {
    if (userRole === 'admin') {
        window.location.href = 'view_feedback_history.html';
    } else if (userRole === 'instructor') {
        window.location.href = 'instructor_dashboard.html';
    } else if (userRole === 'student') {
        window.location.href = 'give_feedback.html';
    } else {
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Login form handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            let userRole = '';
            if (username === 'admin' && password === 'admin123') {
                userRole = 'admin';
            } else if (username === 'instructor' && password === 'inst123') {
                userRole = 'instructor';
            } else if (username === 'student' && password === 'std123') {
                userRole = 'student';
            }

            if (userRole) {
                localStorage.setItem('userRole', userRole);
                localStorage.setItem('loggedInUser', username);
                handleLoginRedirect(userRole);
            } else {
                alert('Invalid username or password.');
            }
        });
    }

<<<<<<< HEAD
    // Mobile menu toggle
=======
    if (userRole) {
        
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('loggedInUser', username);
        handleLoginRedirect(userRole);
    } else {
        alert('Invalid username or password.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
>>>>>>> b38b25169cfc60dbad546e9f09b3dab25ed2af49
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navbarNav = document.querySelector('.navbar-nav');
    if (mobileMenuButton && navbarNav) {
        mobileMenuButton.addEventListener('click', function () {
            navbarNav.classList.toggle('open');
        });
    }

    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Admin dashboard stats
    if (document.body.id === 'admin-dashboard-page') {
        const totalFeedback = 150;
        const averageRating = 4.2;
        const newFeedback = 15;

        const totalFeedbackElem = document.getElementById('total-feedback');
        if (totalFeedbackElem) totalFeedbackElem.textContent = totalFeedback;
        const averageRatingElem = document.getElementById('average-rating');
        if (averageRatingElem) averageRatingElem.textContent = averageRating.toFixed(1);
        const newFeedbackElem = document.getElementById('new-feedback');
        if (newFeedbackElem) newFeedbackElem.textContent = newFeedback;
    }

    // Instructor dashboard stats
    if (document.body.id === 'instructor-dashboard-page') {
        const totalFeedbackCount = 85;
        const averageRatingValue = 4.5;

        const totalFeedbackCountElem = document.getElementById('total-feedback-count');
        if (totalFeedbackCountElem) totalFeedbackCountElem.textContent = totalFeedbackCount;
        const averageRatingValueElem = document.getElementById('average-rating-value');
        if (averageRatingValueElem) averageRatingValueElem.textContent = averageRatingValue.toFixed(1);

        const courseList = document.getElementById('course-list');
        if (courseList) {
            const courses = [
                { name: 'Introduction to Programming', feedbackCount: 30, avgRating: 4.7 },
                { name: 'Data Structures and Algorithms', feedbackCount: 25, avgRating: 4.3 },
                { name: 'Web Development Basics', feedbackCount: 30, avgRating: 4.8 }
            ];

            courses.forEach(course => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${course.name}:</strong> Total Feedbacks: ${course.feedbackCount}, Average Rating: ${course.avgRating.toFixed(1)}
                `;
                courseList.appendChild(li);
            });
        }
    }

    // Feedback history page
    if (window.location.pathname.includes('view_feedback_history.html')) {
        const feedbackList = document.querySelector('.feedback-list');
        if (feedbackList) {
            feedbackList.innerHTML = '';

            const storedFeedbacks = JSON.parse(localStorage.getItem('allFeedbacks')) || [];

            if (storedFeedbacks.length === 0) {
                feedbackList.innerHTML = '<p>No feedback has been submitted yet.</p>';
            } else {
                storedFeedbacks.forEach(feedback => {
                    const li = document.createElement('li');
                    li.className = 'feedback-item';
                    li.innerHTML = `
                        <h4>${feedback.course} - Rating: ${'★'.repeat(feedback.rating)}${'☆'.repeat(5 - feedback.rating)}</h4>
                        <p>Submitted on: ${feedback.date || 'N/A'}</p>
                        <p>${feedback.comments}</p>
                    `;
                    feedbackList.appendChild(li);
                });
            }
        }
    }

    // Feedback form handler
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const course = document.getElementById('course').value;
            const ratingInput = document.querySelector('input[name="rating"]:checked');
            const comments = document.getElementById('comments').value;
            const messageDiv = document.getElementById('feedback-message');

            if (course && ratingInput && comments) {
                const loggedInUser = localStorage.getItem('loggedInUser') || 'Anonymous';

                const newFeedback = {
                    user: loggedInUser,
                    course: course,
                    rating: parseInt(ratingInput.value, 10),
                    comments: comments,
                    date: new Date().toLocaleDateString()
                };

                let existingFeedbacks = JSON.parse(localStorage.getItem('allFeedbacks')) || [];
                existingFeedbacks.push(newFeedback);
                localStorage.setItem('allFeedbacks', JSON.stringify(existingFeedbacks));

                console.log('Feedback Submitted:', newFeedback);
                if (messageDiv) {
                    messageDiv.textContent = 'Feedback submitted successfully! Thank you.';
                    messageDiv.style.color = 'green';
                }
                feedbackForm.reset();
            } else if (messageDiv) {
                messageDiv.textContent = 'Please fill all fields and give a rating.';
                messageDiv.style.color = 'red';
            }
        });
    }

    // Logout buttons
    document.querySelectorAll('#logout').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            localStorage.removeItem('userRole');
            localStorage.removeItem('loggedInUser');
            alert('You have been logged out.');
            window.location.href = 'login.html';
        });
    });
});