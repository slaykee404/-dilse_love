/* script.js - shared interactive behaviors */

/* Simple DOM ready */
document.addEventListener('DOMContentLoaded', function(){
  // login validation (if present)
  const loginForm = document.querySelector('#loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', function(e){
      const email = loginForm.querySelector('input[name="email"]').value.trim();
      const pass = loginForm.querySelector('input[name="password"]').value.trim();
      if(!email || !pass){
        e.preventDefault();
        alert('Please enter email and password.');
      }
    });
  }

  // chat item click -> open mock chat (client-side)
  document.querySelectorAll('.chat-item').forEach(item=>{
    item.addEventListener('click', () => {
      const name = item.dataset.name || 'User';
      alert('Open chat with ' + name + ' (replace with real chat view).');
    });
  });

  // match page: simple swipe simulation
  const cards = document.querySelectorAll('.match-card');
  if(cards.length){
    let index = 1; // highlight middle-ish
    function refreshActive(){
      cards.forEach((c, i)=>{
        c.classList.toggle('active', i === index);
      });
    }
    refreshActive();
    document.querySelectorAll('.btn-prev,.btn-next').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        if(btn.classList.contains('btn-prev')) index = Math.max(0, index-1);
        else index = Math.min(cards.length-1, index+1);
        refreshActive();
      });
    });
    // keyboard arrows
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowLeft') { index = Math.max(0, index-1); refreshActive(); }
      if(e.key === 'ArrowRight'){ index = Math.min(cards.length-1, index+1); refreshActive(); }
    });
  }

  // like heart toggles
  document.querySelectorAll('.like-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btn.classList.toggle('liked');
      btn.innerText = btn.classList.contains('liked') ? '♥' : '♡';
    });
  });
});