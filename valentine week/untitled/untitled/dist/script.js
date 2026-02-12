const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMsg = document.getElementById('successMsg');
const letterPaper = document.querySelector('.letter-paper');

// Yes button click
yesBtn.addEventListener('click', () => {
  document.querySelector('.buttons-area').style.display = 'none';
  document.querySelector('.signature').style.display = 'none';
  successMsg.style.display = 'block';
  
  // Create floating hearts
  for(let i = 0; i < 30; i++) {
    setTimeout(() => createHeart(), i * 100);
  }
});

// No button - moves away when hovered
function moveNoButton() {
  const paperRect = letterPaper.getBoundingClientRect();
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  
  // Random position within the letter paper
  const maxX = paperRect.width - btnWidth - 100;
  const maxY = 200;
  const minX = 0;
  const minY = -50;
  
  const randomX = Math.random() * (maxX - minX) + minX;
  const randomY = Math.random() * (maxY - minY) + minY;
  
  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';
}

// Move on hover
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton();
});

// Move when mouse gets close
letterPaper.addEventListener('mousemove', (e) => {
  const noBtnRect = noBtn.getBoundingClientRect();
  const distance = Math.sqrt(
    Math.pow(e.clientX - (noBtnRect.left + noBtnRect.width/2), 2) + 
    Math.pow(e.clientY - (noBtnRect.top + noBtnRect.height/2), 2)
  );
  
  if(distance < 120) {
    moveNoButton();
  }
});

// Create floating hearts
function createHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = ['❤️', '💕', '💖', '💗', '💞', '💓'][Math.floor(Math.random() * 6)];
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = '100vh';
  heart.style.fontSize = (Math.random() * 40 + 30) + 'px';
  heart.style.zIndex = '1000';
  heart.style.pointerEvents = 'none';
  
  const duration = Math.random() * 3 + 3;
  const drift = (Math.random() - 0.5) * 200;
  
  heart.style.animation = `floatUp ${duration}s ease-out forwards`;
  heart.style.setProperty('--drift', drift + 'px');
  
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

// Animation for hearts
const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-120vh) translateX(var(--drift)) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);