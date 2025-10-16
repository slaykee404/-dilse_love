// dashboard.js
// Minimal JS: swaps placeholder USER if session data injected later (JSP)
// Also adds minor animation on resize for small screens

document.addEventListener('DOMContentLoaded', () => {
  // example: if your backend sets window.currentUser, swap it in
  const userSpan = document.querySelector('.welcome .user');
  if (window.currentUser) {
    userSpan.textContent = window.currentUser;
  }

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