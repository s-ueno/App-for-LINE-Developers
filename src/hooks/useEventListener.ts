import { useState, useRef, useEffect, useCallback } from 'react';
import { createHandlerSetter } from "../core/util";
/**
 * Reactで HTMLのイベント発火をサブスクライブするカスタムHookです
 * 
 * 使用例：
 * 
 * // windowのmousemoveイベントをキャプチャするサンプル
 * 
 * const handler = useCallback(
 *  ({ clientX, clientY }) => {
 *  cosole.log(`${clientX} / ${clientY}`);
 *  },[staticObj //静的な適当なオブジェクト ]);
 * useEventListener('mousemove', handler);
 * @param eventName 
 * @param handler 
 * @param element 
 */
export function useEventListener(eventName : string, handler : Function, element = window){
  const savedHandler = useRef<Function>(() => { });
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
     
      const eventListener = event => savedHandler.current(event);     
      element.addEventListener(eventName, eventListener);
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] 
  );
};

const defaultOptions = {
  capture: false,
  once: false,
  passive: false,
};

/**
 * useEeventListener と同じ機能をより使い安くしたHook
 * 
 * 使用例
 * 
 * const onWindowResize = useGlobalEvent('resize');
 * 
 * onWindowResize(e => console.log(e));
 * @param eventName 
 * @param options 
 */
export const useGlobalEvent = (eventName: string, options = defaultOptions) => { 
  const { handlerRef, setHandler }  = createHandlerSetter(() => {});
  const opts = { ...defaultOptions, ...(options || {}) };

  useEffect(() => {
    const cb = (event) => {
      if (handlerRef.current) {
          handlerRef.current(event);
      }
    };
    if (handlerRef.current && eventName) {
        window.addEventListener(eventName, cb, opts);
    }
    return () => {
      if (eventName) {
        window.removeEventListener(eventName, cb, opts);
      }
    };
  }, [eventName, options]);

  return setHandler;
}
