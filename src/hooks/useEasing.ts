import { useState, useEffect } from 'react';

/**
 * アニメーションを実装するHooke
 * 
 * 使用例
 * 
 * const animation1 = useEasing();
 * 
 * <div innerStyle={{  marginTop: animation1 * 200 - 100 }} />
 * @param easingName 
 * @param duration 
 * @param delay 
 */
export function useEasing(
easingName : 'linear' | 'elastic' | 'inExpo' = 'elastic',
  duration = 500,
  delay = 0
) {
  const elapsed = useAnimationTimer(duration, delay);
  const n = Math.min(1, elapsed / duration);
  return easing[easingName](n);
}

// https://github.com/streamich/ts-easing/blob/master/src/index.ts
const easing = {
  linear: n => n,
  elastic: n =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: n => Math.pow(2, 10 * (n - 1))
};

function useAnimationTimer(duration = 1000, delay = 0) {
  const [elapsed, setTime] = useState(0);

  useEffect(
    () => {
      let animationFrame, timerStop, start;

      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }

      function loop() {
        animationFrame = requestAnimationFrame(onFrame);
      }

      function onStart() {
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        }, duration);

        start = Date.now();
        loop();
      }

      const timerDelay = setTimeout(onStart, delay);
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay] // Only re-run effect if duration or delay changes
  );

  return elapsed;
}