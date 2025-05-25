document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const navbarNav = document.querySelector(".navbar-nav");

  if (mobileMenuButton && navbarNav) {
    mobileMenuButton.addEventListener("click", () => {
      navbarNav.classList.toggle("open");
    });
  }

  const logoutButtons = document.querySelectorAll("#logout, .nav-link#logout");

  logoutButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // ነባሪውን የሊንክ ባህሪ ይከላከላል
      alert("Logout clicked (Replace with real logout functionality!)");
      window.location.href = "index.html"; // ወደ መነሻ ገጽ ይመለሳል
    });
  });

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const currentPath = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();

    if (
      linkPath === currentPath ||
      (currentPath === "" && linkPath === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // --- ለየገጹ የተወሰኑ ተግባራት (ከ inline scripts የተዘዋወሩ) ---

  // ለ give_feedback.html - የግብረመልስ ቅጽ ማስገባት
  const feedbackForm = document.getElementById("feedback-form");
  const feedbackMessage = document.getElementById("feedback-message");

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (event) => {
      event.preventDefault(); // ነባሪውን የቅጽ ማስረከብ ይከላከላል

      const course = document.getElementById("course").value;
      const rating = document.querySelector('input[name="rating"]:checked');
      const comments = document.getElementById("comments").value;

      if (!course || !rating || !comments.trim()) {
        feedbackMessage.textContent =
          "Please fill in all fields and select a rating.";
        feedbackMessage.className = "error-message";
        return;
      }

      const feedbackData = {
        course: course,
        rating: parseInt(rating.value),
        comments: comments.trim(),
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      let studentFeedback =
        JSON.parse(localStorage.getItem("studentFeedback")) || [];
      studentFeedback.push(feedbackData);
      localStorage.setItem("studentFeedback", JSON.stringify(studentFeedback));

      feedbackMessage.textContent = "Feedback submitted successfully!";
      feedbackMessage.className = "success-message";
      feedbackForm.reset();
    });
  }

  const feedbackList = document.querySelector(".feedback-list");

  function getFeedbackHistory() {
    const feedbackHistory = localStorage.getItem("studentFeedback");
    return feedbackHistory ? JSON.parse(feedbackHistory) : [];
  }

  function displayFeedbackHistory(feedbackArray) {
    if (!feedbackList) return;

    feedbackList.innerHTML = "";

    if (feedbackArray.length === 0) {
      const noFeedbackMessage = document.createElement("p");
      noFeedbackMessage.className = "no-feedback";
      noFeedbackMessage.textContent = "هنوز هیچ بازخوردی ثبت نشده است.";
      feedbackList.appendChild(noFeedbackMessage);
      return;
    }

    feedbackArray.forEach((feedback) => {
      const listItem = document.createElement("li");
      listItem.className = "feedback-item";
      listItem.innerHTML = `
                <h4>${feedback.course}</h4>
                <p><strong>Rating:</strong> <span class="rating">${"★".repeat(
                  feedback.rating
                )}</span></p>
                <p><strong>Comments:</strong> ${feedback.comments}</p>
                <p class="date"><strong>Date:</strong> ${
                  feedback.date || "Not specified"
                }</p>
            `;
      feedbackList.appendChild(listItem);
    });
  }

  if (currentPath === "view_feedback_history.html") {
    const feedbackHistory = getFeedbackHistory();
    displayFeedbackHistory(feedbackHistory.reverse());
  }

  if (currentPath === "admin_dashboard.html") {
    const totalFeedbackElement = document.getElementById("total-feedback");
    const averageRatingElement = document.getElementById("average-rating");
    const newFeedbackElement = document.getElementById("new-feedback");

    const feedbackSummaryData = {
      totalFeedback: 150,
      averageRating: 4.2,
      newFeedbackLastWeek: 25,
    };

    if (totalFeedbackElement)
      totalFeedbackElement.textContent = feedbackSummaryData.totalFeedback;
    if (averageRatingElement)
      averageRatingElement.textContent =
        feedbackSummaryData.averageRating.toFixed(1);
    if (newFeedbackElement)
      newFeedbackElement.textContent = feedbackSummaryData.newFeedbackLastWeek;
  }

  if (currentPath === "instructor_dashboard.html") {
    const totalFeedbackCount = document.getElementById("total-feedback-count");
    const avgRating = document.getElementById("average-rating-value");
    const courseList = document.getElementById("course-list");

    const instructorData = {
      totalFeedback: 85,
      averageRating: 4.5,
      courses: [
        {
          name: "Web Development Basics",
          averageRating: 4.7,
          totalFeedback: 30,
        },
        { name: "Database Systems", averageRating: 4.2, totalFeedback: 25 },
        { name: "Software Engineering", averageRating: 4.8, totalFeedback: 20 },
        {
          name: "Data Structures & Algorithms",
          averageRating: 4.3,
          totalFeedback: 10,
        },
      ],
    };

    if (totalFeedbackCount)
      totalFeedbackCount.textContent = instructorData.totalFeedback;
    if (avgRating)
      avgRating.textContent = instructorData.averageRating.toFixed(1);

    if (courseList) {
      courseList.innerHTML = "";
      instructorData.courses.forEach((course) => {
        const listItem = document.createElement("li");
        listItem.className = "course-item";
        listItem.innerHTML = `
                    <h4>${course.name}</h4>
                    <p>Average Rating: <span class="rating-value">${course.averageRating.toFixed(
                      1
                    )}</span></p>
                    <p>Total Feedback: ${course.totalFeedback}</p>
                `;
        courseList.appendChild(listItem);
      });
    }
  }
});
