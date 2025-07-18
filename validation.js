function sendEmail(e) {
        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const phone = document.getElementById("contact-phone").value.trim();
        const message = document.getElementById("contact-message").value.trim();
        const resDiv = document.getElementById("my-form-message");
        resDiv.innerText="";

        const nameRegex=/^[a-zA-Z\s]{2,50}$/;
        if(!nameRegex.test(name)){
          resDiv.innerText="Name should have atleast 2 to 10 letters,no digits";
          resDiv.style.color="red"
          return false
        }

        const phoneRegex=/^\d{10}$/;
        if(!phoneRegex.test(phone)){
          resDiv.innerText="Phone number should have 10 digits";
          resDiv.style.color="red"
          return false
        }

        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
          resDiv.innerText="Enter correct Email";
          resDiv.style.color="red"
          return false
        }

        e.preventDefault(); // stop normal form submission

        emailjs.sendForm('service_9ni9bkf', 'template_f1uizrg', '#contact-form')
          .then(function(response) {
            alert("✅ Message sent successfully!");
            document.getElementById("contact-form").reset(); // clear the form
          }, function(error) {
            alert("❌ Failed to send message: " + error.text);
          });
        resDiv.innerText="Message send........";
        resDiv.style.color="green";
        return false; // prevent form refresh
      }