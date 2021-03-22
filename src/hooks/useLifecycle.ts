import { useCallback, useEffect, useRef } from 'react';

function useHandler(func: Function) {
  const handlerRef = useRef(func);
  handlerRef.current = func;
  const setHandler = useCallback((nextCallback) => {
    handlerRef.current = nextCallback;
  }, []);
  return { handle: handlerRef, setHandle: setHandler }
}

const useInitialized = (func: Function) => {
  const handler = useHandler(func);
  useEffect(() => {
    if (handler.handle.current) {
      handler.handle.current();
    }
  }, []);
  return handler.setHandle;
};

/**
 * 初期化定義メソッドです
 * 
 * レンダリング完了後の初回一度のみ実行するイベントを定義します
 * @param func 
 */
export function useInitialize(func: Function) {
  useInitialized(() => { })(func);
}

const useDisposed = (func: Function) => {
  const handler = useHandler(func);
  useEffect(() => () => {　/* 二度目のアロー関数がミソ */
    if (handler.handle.current) {
      handler.handle.current();
    }
  }, []);
  return handler.setHandle;
}

/**
 * コンポーネントが破棄されるタイミングに一度だけ実行されます
 * @param func 
 */
export function useDispose(func: Function) {
  useDisposed(() => { })(func);
}

/**
 * 初期化と終了処理を同時に返します
 */
export const useLifecycle = () => {
  const onInitialized = useInitialized(() => { });
  const onDisposed = useDisposed(() => { });
  return [onInitialized, onDisposed];
};

