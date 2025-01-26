window.onload = function() {
    // Flip the card on click
    const card = document.getElementById('card');
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  
    // Optional: Dynamically set guest name from URL, e.g. ?name=Ash
    const params = new URLSearchParams(window.location.search);
    const guestNameParam = params.get('name');
    if (guestNameParam) {
      document.getElementById('guest-name').textContent = guestNameParam;
    }
  
    // Simple Confetti
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
        // Draw circle confetti
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
  
        // Update position
        confetti.y += speed;
        confetti.angle += spinSpeed;
  
        // Loop confetti back up top
        if (confetti.y > canvas.height) {
          confettiPieces[index].y = -10;
        }
      });
      requestAnimationFrame(drawConfetti);
    }
  
    createConfetti();
    drawConfetti();
  };
  