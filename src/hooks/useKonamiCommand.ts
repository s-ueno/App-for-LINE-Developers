import React, { useState, useEffect, useRef } from 'react';


export function useKonamiCommand(handler : Function) {
  const [keys, setKeys] = useState([]);
  const isKonamiCode = keys.join(' ') === 'up up down down left right left right B A';
  useEffect(() => {
    let timeout;
    window.document.onkeydown = (e) => {
      // @ts-ignore TS2345
      setKeys((currentKeys) => [...currentKeys, getKeyName(e.keyCode)]);
      clearTimeout(timeout);
      timeout = setTimeout(() => setKeys([]), 5000);
    };
  }, []);
  useEffect(() => {
    if (isKonamiCode) {
      handler();
      setKeys([]);
    }
  }, [isKonamiCode, handler]);
  return isKonamiCode;
}
const getKeyName = (keyCode) => {
  return {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'A',
    66: 'B',
  }[keyCode];
};