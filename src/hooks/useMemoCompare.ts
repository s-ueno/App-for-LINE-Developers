import React, { useState, useEffect, useRef } from 'react';

/**
 * 頻繁にレンダリングするのを防ぐmemo化を、変更前後を元に実装簡易化するカスタムHookです。
 * 
 * 使用例
 * 
 * const [state, setState] = useState();
 * const objFinal = useMemoCompare(obj：ここに変更を感知したいオブジェクトを設定 , (prev, next) => {
 *   return prev && prev.id === next.id;
 * });
 * 
 * useEffect(() => {
 *  setState(value);
 * }, [objFinal]) // useMemoCompare
 * @param next 
 * @param compare 
 */
export function useMemoCompare<T>(next : T, compare: (previous: T, next: T) => boolean) {
  const previousRef = useRef<T>();
  const previous = previousRef.current;
  // @ts-ignore
  const isEqual = compare(previous, next);
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });
  return isEqual ? previous : next;
}