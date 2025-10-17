// dashboard.js
// Minimal JS: swaps placeholder USER if session data injected later (JSP)
// Also adds minor animation on resize for small screens

document.addEventListener('DOMContentLoaded', () => {
  // example: if your backend sets window.currentUser, swap it in
  const userSpan = document.querySelector('.welcome .user');
  if (window.currentUser) {
    userSpan.textContent = window.currentUser;
  }
  // Inside your script.js or similar file
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 1. Send an HTTP POST request to the API endpoint
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    })
    // 2. Process the response from the Java backend
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Signup successful:', data);
        window.location.href = '/dashboard.html'; // Redirect on success
    })
    .catch(error => {
        console.error('Error during signup:', error);
        alert('Signup failed.');
    });
});

  // placeholder: change illustration if you want to preview a local file
  // Example: document.getElementById('dash-art').src = 'images/dashboard-art.png';

  // small shadow tweak for mobile
  function tweakShadows() {
    if (window.innerWidth < 700) {
      document.querySelectorAll('.card').forEach(c => c.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.09)');
    } else {
      document.querySelectorAll('.card').forEach(c => c.style.boxShadow = '');
    }
  }
  tweakShadows();
  window.addEventListener('resize', tweakShadows);

});
