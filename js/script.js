// organized_script.js

// =============== POPUP HANDLING AFTER SIGNUP ===============
function showSuccessPopup(message, redirectUrl) {
  const popup = document.getElementById('popup');
  const successMsg = document.getElementById('successMessage');

  successMsg.innerText = message;
  popup.classList.remove('hidden');

  setTimeout(() => {
    popup.classList.add('hidden');
    window.location.href = redirectUrl;
  }, 1500);
}

// =============== SIGNUP FORM SUBMISSION ===============
document.addEventListener('DOMContentLoaded', () => {
  const providerForm = document.getElementById('SignupForm');
  const consumerForm = document.getElementById('consumerSignupForm');

  if (providerForm) {
    providerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Save to localStorage (example only, replace with backend call)
      localStorage.setItem('providerRegistered', 'true');
      showSuccessPopup('Provider registered successfully!', 'signin.html');
    });
  }

  if (consumerForm) {
    consumerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.setItem('consumerRegistered', 'true');
      showSuccessPopup('Consumer registered successfully!', 'signin.html');
    });
  }
});

// =============== SIGNIN FORM HANDLING ===============
document.addEventListener('DOMContentLoaded', () => {
  const signinForm = document.getElementById('signinForm');

  if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.querySelector('input[name="role"]:checked');

      if (!role) {
        alert('Please select Provider or Consumer.');
        return;
      }

      const selectedRole = role.value;

      // Simulate login match (replace with server verification)
      const isProvider = selectedRole === 'provider' && localStorage.getItem('providerRegistered') === 'true';
      const isConsumer = selectedRole === 'consumer' && localStorage.getItem('consumerRegistered') === 'true';

      if (isProvider || isConsumer) {
        if (selectedRole === 'provider') {
          window.location.href = 'provider-dashboard.html';
        } else {
          window.location.href = 'consumer-dashboard.html';
        }
      } else {
        alert('Invalid credentials or not registered.');
      }
    });
  }
});

// =============== CONSUMER ACCESS TO PROFESSIONALS ===============
document.addEventListener('DOMContentLoaded', () => {
  const professionalSection = document.getElementById('professionalSection');
  const consumerAccess = localStorage.getItem('consumerRegistered') === 'true';

  if (professionalSection) {
    professionalSection.style.display = consumerAccess ? 'block' : 'none';
  }
});

// =============== APPOINTMENT BOOKING JS (IF USED) ===============
document.addEventListener('DOMContentLoaded', () => {
  const appointmentForm = document.getElementById('appointmentForm');
  const appointmentPopup = document.getElementById('appointmentSuccessPopup');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedDate = document.getElementById('appointmentDate').value;
      document.getElementById('appointmentDateMsg').innerText = `Appointment booked for ${selectedDate}`;
      appointmentPopup.classList.remove('hidden');
      setTimeout(() => {
        appointmentPopup.classList.add('hidden');
        appointmentForm.reset();
      }, 1500);
    });
  }
});

document.getElementById("signinForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find all users matching email & password
  const matchedUsers = users.filter(user => user.email === email && user.password === password);

  if (matchedUsers.length === 0) {
    alert("Incorrect email or password!");
    return;
  }

  // If user has multiple roles (provider & consumer), show role choice
  if (matchedUsers.length > 1) {
    // Hide signin form
    document.getElementById("signinForm").style.display = "none";

    // Show role choice buttons
    const roleChoiceDiv = document.getElementById("roleChoice");
    roleChoiceDiv.style.display = "block";

    // Save matched users for role selection
    window.matchedUsers = matchedUsers;
  } else {
    // Only one matched user, redirect immediately
    const matchedUser = matchedUsers[0];
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));
    redirectUserByRole(matchedUser.role);
  }
});

// Handle role choice buttons
document.getElementById("chooseProviderBtn").addEventListener("click", () => {
  const user = window.matchedUsers.find(u => u.role === "provider");
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    redirectUserByRole("provider");
  } else {
    alert("Provider role not found for this account.");
  }
});

document.getElementById("chooseConsumerBtn").addEventListener("click", () => {
  const user = window.matchedUsers.find(u => u.role === "consumer");
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    redirectUserByRole("consumer");
  } else {
    alert("Consumer role not found for this account.");
  }
});

function redirectUserByRole(role) {
  if (role === "provider") {
    window.location.href = "extra pages/provider-dashboard.html";
  } else if (role === "consumer") {
    window.location.href = "extra pages/consumer-dashboard.html"; // or your consumer dashboard
  }
}


