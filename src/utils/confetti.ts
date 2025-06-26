import { PRIMARY_GREEN, SECONDARY_GREEN } from '@theme/colorTheme';
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
      colors: [PRIMARY_GREEN, SECONDARY_GREEN, '#777777'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
