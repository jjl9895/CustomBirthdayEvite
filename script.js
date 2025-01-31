/* script.js */
window.onload = function() {
    const card = document.getElementById('card');
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  
    // Optional: dynamic name
    const params = new URLSearchParams(window.location.search);
    const guestNameParam = params.get('name');
    if (guestNameParam) {
      document.getElementById('guest-name').textContent = guestNameParam;
    }
  
    // Confetti setup
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let confettiPieces = [];
    const colors = ['#FFD700', '#FF4500', '#48D1CC', '#FF69B4', '#7FFF00'];
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const rsvpButton = document.querySelector('.rsvp-button');
    rsvpButton.addEventListener('click', () => {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSfhw0DhUo-FqJich7luy4JkqKoj_UkSWHNtOa1thfHuKmRsaw/viewform?usp=header', '_blank');
    });
    
    const whocoming = document.querySelector('.whocoming');
    whocoming.addEventListener('click', () => {
      window.open('https://docs.google.com/spreadsheets/d/1vx0wz01FBlTBxMBB2GXrCcGb_4eNOtBqJv42wbwYAnI/edit?usp=sharing', '_blank');
    })

    

    function createConfetti() {
      const confettiCount = 100;
      for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          r: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 3 + 2,
          angle: Math.random() * 360,
          spinSpeed: Math.random() * 10 - 5
        });
      }
    }
  
    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiPieces.forEach((confetti, index) => {
        let { x, y, r, color, speed, angle, spinSpeed } = confetti;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        // Move confetti
        confetti.y += speed;
        confetti.angle += spinSpeed;
        // Loop to top
        if (confetti.y > canvas.height) {
          confettiPieces[index].y = -10;
        }
      });
      requestAnimationFrame(drawConfetti);
    }
  
    createConfetti();
    drawConfetti();
  };
  