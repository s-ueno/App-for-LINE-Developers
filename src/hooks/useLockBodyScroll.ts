import { useState, useLayoutEffect } from 'react';

/**
 * モーダル表示するコンテンツの最初に呼び出せば、バックがスクロール無効になります
 */
export function useLockBodyScroll() {
  // @ts-ignore
  useLayoutEffect(() => {
   const originalStyle = window.getComputedStyle(document.body).overflow;  
   document.body.style.overflow = 'hidden';
   return () => document.body.style.overflow = originalStyle;
   }, []); 
}
