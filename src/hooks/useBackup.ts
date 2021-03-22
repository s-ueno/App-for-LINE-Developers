import { useState, useEffect, useRef } from 'react';

/**
 * 一つ前の値をバックアップするHook
 * 
 * 使用例
 * 
 * const [count, setCount] = useState(0);
 * const prevCount = useBackup(count);
 * @param value 
 */
export function useBackup<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  return ref.current;
}