 // Contact form submission
    document.getElementById("contactForm").addEventListener("submit", function(event) {
      event.preventDefault();

      // You can extend this part to send form data to a server if needed

      const popup = document.getElementById("successPopup");
      const message = document.getElementById("successMessage");

      message.textContent = "Thank you for contacting us! We will get back to you shortly.";
      popup.classList.remove("hidden");

      setTimeout(() => {
        popup.classList.add("hidden");
        document.getElementById("contactForm").reset();
      }, 3000);
    });

    // Appointment form submission
    document.getElementById("appointmentForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const date = document.getElementById("appointmentDate").value;
      const popup = document.getElementById("successPopup");
      const message = document.getElementById("successMessage");

      message.textContent = `Appointment booked for ${date}`;
      popup.classList.remove("hidden");

      setTimeout(() => {
        popup.classList.add("hidden");
        document.getElementById("appointmentForm").reset();
      }, 3000);
    });
// Signup form submission
     document.getElementById("signupForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const popup = document.getElementById("successPopup");
      const message = document.getElementById("successMessage");

      message.textContent = "Registration Successful! Go to Signin Page";
      popup.classList.remove("hidden");

      setTimeout(() => {
        popup.classList.add("hidden");
        document.getElementById("signupForm").reset();
      }, 3000);
    });

    // Signin form submission
    
    document.getElementById("signinForm").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent form submission

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Dummy login check
  if (email === "admin@engiconnect.com" && password === "admin123") {
    alert("Sign-in successful!");
    // Redirect or load dashboard
  } else {
    alert("Invalid email or password.");
  }
});
