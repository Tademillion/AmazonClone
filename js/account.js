document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality
  const tabs = document.querySelectorAll(".account-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs and forms
      document
        .querySelectorAll(".account-tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".account-form")
        .forEach((f) => f.classList.remove("active"));

      // Add active class to clicked tab and corresponding form
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab + "Form").classList.add("active");
    });
  });

  // Email form submission
  const emailForm = document.getElementById("emailForm");
  if (emailForm) {
    emailForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = document.getElementById("email").value;

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Phone validation regex (accepts formats like: +1-123-456-7890, 123-456-7890, 1234567890)
      const phoneRegex = /^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/;
      if (!emailRegex.test(input) && !phoneRegex.test(input)) {
        // Show error if neither email nor phone format is valid
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.textContent =
          "Please enter a valid email address or phone number";
        errorDiv.style.color = "red";
        emailForm.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
        return;
      }

      console.log("Input validated and submitted:", input);
      // Redirect to password page with validated input
      window.location.href =
        "/password.html?identifier=" + encodeURIComponent(input);
    });
  }

  // Registration form submission
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        passwordCheck: document.getElementById("password-check").value,
      };
      // validate name is correct or not
      if (formData.name.length < 5) {
        showError("name", "name must not be less than 10");
        return;
      }
      // Validate password match
      if (formData.password !== formData.passwordCheck) {
        showError("password-check", "Passwords do not match");
        return;
      }
      // Validate password length
      if (formData.password.length < 6) {
        showError("password", "Password must be at least 6 characters");
        return;
      }

      // Here you would typically make an API call to create the account
      console.log("Registration data:", formData);
      // Redirect to success page or show error
      window.location.href = "/registration-success.html";
    });
  }

  // Password assistance form
  const passwordAssistanceForm = document.getElementById(
    "passwordAssistanceForm"
  );
  if (passwordAssistanceForm) {
    passwordAssistanceForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      // Here you would typically make an API call to send password reset email
      console.log("Password reset requested for:", email);
      // Show success message or redirect
      window.location.href = "/password-reset-sent.html";
    });
  }

  // Password visibility toggle
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  passwordInputs.forEach((input) => {
    const toggle = document.createElement("span");
    toggle.className = "password-toggle";
    toggle.innerHTML = '<i class="fas fa-eye"></i>';
    toggle.style.cursor = "pointer";
    toggle.style.position = "absolute";
    toggle.style.right = "10px";
    toggle.style.top = "50%";
    toggle.style.transform = "translateY(-50%)";
    input.parentElement.style.position = "relative";
    input.parentElement.appendChild(toggle);

    toggle.addEventListener("focus", () => {
      // Toggle input type
      const isPassword = input.getAttribute("type") === "password";
      input.setAttribute("type", isPassword ? "text" : "password");

      // Update icon class directly
      const icon = toggle.querySelector("i");
      icon.className = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
    });
  });
});

// Helper function to show error messages
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;

  // Remove any existing error message
  const existingError = field.parentNode.querySelector(".error-message");
  if (existingError) {
    //  remove the another error messages if exists
    existingError.remove();
  }

  field.parentNode.appendChild(errorDiv);
  field.focus();
}
