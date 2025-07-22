function sendEmail(e) {
  e.preventDefault(); // stop normal form submission

  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const phone = document.getElementById("contact-phone").value.trim();
  const message = document.getElementById("contact-message").value.trim();
  const resDiv = document.getElementById("my-form-message");
  resDiv.innerText = "";

  const nameRegex =/^[a-zA-Z\s]{2,50}$/;
  if (!nameRegex.test(name)) {
    resDiv.innerText="Name should be 2 to 50 letters, no digits or symbols.";
    resDiv.style.color="red";
    return;
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    resDiv.innerText="Phone number should have exactly 10 digits.";
    resDiv.style.color = "red";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    resDiv.innerText = "Enter a valid email address.";
    resDiv.style.color = "red";
    return;
  }

  emailjs.sendForm('service_9ni9bkf', 'template_f1uizrg', '#contact-form')
    .then(function(response) {
      resDiv.innerText = "✅ Message sent successfully!";
      resDiv.style.color = "green";
      document.getElementById("contact-form").reset();
    }, function(error) {
      resDiv.innerText = "❌ Failed to send message: " + error.text;
      resDiv.style.color = "red";
    });
}
