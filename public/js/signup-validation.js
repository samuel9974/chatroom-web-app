// Form validation for signup
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const emailInput = document.getElementById("email");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");

  const emailError = document.getElementById("emailError");
  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");

  // Validation rules
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validateFirstName = (name) => {
    if (!name.trim()) return "First name is required";
    if (name.trim().length < 3)
      return "First name must be at least 3 characters";
    if (name.trim().length > 32)
      return "First name must not exceed 32 characters";
    if (!/^[A-Za-z\s]+$/.test(name))
      return "First name can only contain letters";
    return "";
  };

  const validateLastName = (name) => {
    if (!name.trim()) return "Last name is required";
    if (name.trim().length < 3)
      return "Last name must be at least 3 characters";
    if (name.trim().length > 32)
      return "Last name must not exceed 32 characters";
    if (!/^[A-Za-z\s]+$/.test(name))
      return "Last name can only contain letters";
    return "";
  };

  const validateNamesNotSame = (firstName, lastName) => {
    if (firstName.trim().toLowerCase() === lastName.trim().toLowerCase()) {
      return "First name and last name cannot be the same";
    }
    return "";
  };

  // Clear error messages when user starts typing
  emailInput.addEventListener("input", () => {
    emailError.textContent = "";
    emailInput.classList.remove("is-invalid");
  });

  firstNameInput.addEventListener("input", () => {
    firstNameError.textContent = "";
    firstNameInput.classList.remove("is-invalid");
  });

  lastNameInput.addEventListener("input", () => {
    lastNameError.textContent = "";
    lastNameInput.classList.remove("is-invalid");
  });

  // Form submission
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    // Validate email
    const emailErr = validateEmail(emailInput.value);
    if (emailErr) {
      emailError.textContent = emailErr;
      emailInput.classList.add("is-invalid");
      isValid = false;
    }

    // Validate first name
    const firstNameErr = validateFirstName(firstNameInput.value);
    if (firstNameErr) {
      firstNameError.textContent = firstNameErr;
      firstNameInput.classList.add("is-invalid");
      isValid = false;
    }

    // Validate last name
    const lastNameErr = validateLastName(lastNameInput.value);
    if (lastNameErr) {
      lastNameError.textContent = lastNameErr;
      lastNameInput.classList.add("is-invalid");
      isValid = false;
    }

    // Validate that first name and last name are not the same
    const namesNotSameErr = validateNamesNotSame(
      firstNameInput.value,
      lastNameInput.value,
    );
    if (namesNotSameErr) {
      lastNameError.textContent = namesNotSameErr;
      lastNameInput.classList.add("is-invalid");
      isValid = false;
    }

    // If all validations pass, submit the form
    if (isValid) {
      signupForm.submit();
    }
  });
});
