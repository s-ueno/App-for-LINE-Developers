import { useCallback, useRef } from 'react';

export const createHandlerSetter = (func : Function) => {
  const handlerRef = useRef(func);
  handlerRef.current = func;
  const setHandler = useCallback((nextFunc : Function) => {
    handlerRef.current = nextFunc;
  }, []);
    return { handlerRef, setHandler };
};
