const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");
  let messageError = document.getElementById("messageError");
  let successMsg = document.getElementById("successMsg");

  // reset
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  successMsg.textContent = "";

  let isValid = true;

  // Name
  if (name === "") {
    nameError.textContent = "Name is required";
    isValid = false;
  }

  // Email Regex
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = "Enter a valid email";
    isValid = false;
  }

  // Message
  if (message === "") {
    messageError.textContent = "Message is required";
    isValid = false;
  }

  // Success
  if (isValid) {
    successMsg.textContent = "Form submitted successfully!";
    form.reset();
  }
});