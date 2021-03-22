import { useState } from 'react';

/**
 * ローカルストレージをHookするヘルパー
 * 
 * 使用例
 * 
 * const [name, setName] = useLocalStorage<string>('key', 'defaultValue');
 * @param key 
 * @param defaultValue 
 */
export function useLocalStorage<T>(key: string, defaultValue?: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}