import confetti from 'canvas-confetti';

export const fireConfetti = () => {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 90,
      spread: 80,
      origin: { x: Math.random(), y: 1 },
      colors: ['#15AB94', '#A8D6CC', '#777777'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
