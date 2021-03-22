import React, { useState, useEffect, useRef } from 'react';

/**
 * React で setInterval　を実現するカスタムHooks
 * @param callback 
 * @param delay 
 */
export function useInterval(callback : Function, delay : number) {
  const savedCallback = useRef<Function>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
        // @ts-ignore
        savedCallback.current();    
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
