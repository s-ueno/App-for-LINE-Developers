import React, { useReducer } from "react";
/**
 * フラグ変更を発火します。
 * 
 * 使用例：
 * 
 * const [isOn, toggleIsOn] = useToggle();
 * <button onClick={toggleIsOn}>{isOn ? 'Off' : 'On'}</button>
 * @param initialValue 
 */
export function useToggle(initialValue = false){
  return useReducer((state) => !state, initialValue);
}