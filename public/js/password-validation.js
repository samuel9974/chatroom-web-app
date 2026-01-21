// Password validation for signup
document.addEventListener("DOMContentLoaded", () => {
  const passwordForm = document.getElementById("passwordForm");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const toggleConfirmPasswordBtn = document.getElementById(
    "toggleConfirmPassword",
  );

  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  // Password strength checker elements
  const uppercaseCheck = document.getElementById("uppercase");
  const lowercaseCheck = document.getElementById("lowercase");
  const numbersCheck = document.getElementById("numbers");
  const specialCheck = document.getElementById("special");
  const lengthCheck = document.getElementById("length");

  // Toggle password visibility
  const togglePasswordVisibility = (input, button) => {
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";

    const icon = button.querySelector("i");
    if (isPassword) {
      icon.classList.remove("bi-eye-fill");
      icon.classList.add("bi-eye-slash-fill");
    } else {
      icon.classList.remove("bi-eye-slash-fill");
      icon.classList.add("bi-eye-fill");
    }
  };

  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      togglePasswordVisibility(passwordInput, togglePasswordBtn);
      return false;
    });
  }

  if (toggleConfirmPasswordBtn) {
    toggleConfirmPasswordBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordBtn);
      return false;
    });
  }

  // Check password strength
  const checkPasswordStrength = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasMinLength = password.length >= 8;

    // Update visual indicators
    updateIndicator(uppercaseCheck, hasUppercase);
    updateIndicator(lowercaseCheck, hasLowercase);
    updateIndicator(numbersCheck, hasNumbers);
    updateIndicator(specialCheck, hasSpecial);
    updateIndicator(lengthCheck, hasMinLength);

    return {
      isValid:
        hasUppercase &&
        hasLowercase &&
        hasNumbers &&
        hasSpecial &&
        hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSpecial,
      hasMinLength,
    };
  };

  const updateIndicator = (element, isValid) => {
    if (isValid) {
      element.classList.remove("text-muted");
      element.classList.add("text-success");
      element.innerHTML = "✓ " + element.innerHTML.substring(2);
    } else {
      element.classList.remove("text-success");
      element.classList.add("text-muted");
      element.innerHTML = "✗ " + element.innerHTML.substring(2);
    }
  };

  const validatePassword = (password) => {
    if (!password.trim()) return "Password is required";

    const strength = checkPasswordStrength(password);

    if (!strength.hasMinLength) return "Password must be at least 8 characters";
    if (!strength.hasUppercase)
      return "Password must contain uppercase letters (A-Z)";
    if (!strength.hasLowercase)
      return "Password must contain lowercase letters (a-z)";
    if (!strength.hasNumbers) return "Password must contain numbers (0-9)";
    if (!strength.hasSpecial)
      return "Password must contain special characters (!@#$%^&*)";

    return "";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword.trim()) return "Confirm password is required";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
  };

  // Real-time password strength feedback
  passwordInput.addEventListener("input", () => {
    passwordError.textContent = "";
    passwordInput.classList.remove("is-invalid");

    if (passwordInput.value) {
      checkPasswordStrength(passwordInput.value);
    }
  });

  // Clear error message when user types in confirm password
  confirmPasswordInput.addEventListener("input", () => {
    confirmPasswordError.textContent = "";
    confirmPasswordInput.classList.remove("is-invalid");
  });

  // Form submission
  passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    // Validate password
    const passwordErr = validatePassword(passwordInput.value);
    if (passwordErr) {
      passwordError.textContent = passwordErr;
      passwordInput.classList.add("is-invalid");
      isValid = false;
    } else {
      passwordInput.classList.remove("is-invalid");
    }

    // Validate confirm password
    const confirmPasswordErr = validateConfirmPassword(
      passwordInput.value,
      confirmPasswordInput.value,
    );
    if (confirmPasswordErr) {
      confirmPasswordError.textContent = confirmPasswordErr;
      confirmPasswordInput.classList.add("is-invalid");
      isValid = false;
    } else {
      confirmPasswordInput.classList.remove("is-invalid");
    }

    // If all validations pass, submit the form
    if (isValid) {
      passwordForm.submit();
    }
  });

  // Back button handler
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "/signup";
    });
  }
});
