import { useEffect, useState } from 'react';

export const useCountUp = (end: number, duration: number = 2000, startDelay: number = 0) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [end, duration, startDelay]);

  return count;
};
