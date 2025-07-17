
function form_submited() {
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const phone = document.getElementById("contact-phone").value.trim();
  const message = document.getElementById("contact-message").value.trim();
  const errorDiv = document.getElementById("form-messages");

  errorDiv.innerHTML = "";
  errorDiv.classList.remove("success", "error");

  // Basic required check
  if (!name || !email || !phone || !message) {
    errorDiv.innerHTML = "All fields are required.";
    return false; // 🚫 prevent form submission
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorDiv.innerHTML = "Enter a valid email address.";
    return false;
  }

  // Phone number check
  if (!/^\d{10}$/.test(phone)) {
    errorDiv.innerHTML = "Enter a valid 10-digit phone number.";
    return false;
  }

  return true; // ✅ allow form submission, will redirect to FormSubmit’s page
}

