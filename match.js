const cards = document.querySelectorAll('.card');
const nope = document.getElementById('nope');
const love = document.getElementById('love');
let current = 0;

function showCard(index) {
  cards.forEach((card, i) => {
    card.style.zIndex = cards.length - i;
    card.style.opacity = i === index ? '1' : '0';
    card.style.transform = 'scale(' + (i === index ? '1' : '0.9') + ')';
  });
}

function swipe(direction) {
  const card = cards[current];
  if (!card) return;

  card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  card.style.transform = `translateX(${direction === 'right' ? 300 : -300}px) rotate(${direction === 'right' ? 30 : -30}deg)`;
  card.style.opacity = '0';

  setTimeout(() => {
    current = (current + 1) % cards.length;
    card.style.transition = 'none';
    showCard(current);
  }, 500);
}

nope.addEventListener('click', () => swipe('left'));
love.addEventListener('click', () => swipe('right'));

/* Touch/Swipe Support */
let startX = 0;
document.addEventListener('touchstart', e => startX = e.touches[0].clientX);
document.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (endX - startX > 100) swipe('right');
  else if (startX - endX > 100) swipe('left');
});

showCard(current);