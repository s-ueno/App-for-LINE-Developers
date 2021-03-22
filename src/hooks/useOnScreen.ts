import { useState, useEffect, useRef } from 'react';


/**
 * スクリーンがレンダリングされたタイミングで通知するHook
 * 
 * 使用例
 * 
 * const ref = useRef();
 * const onScreen = useOnScreen(ref);
 * <div
 *  ref={ref}
 * >
 *  {onScreen ? "rendered" : ""}
 * </div>
 * @param ref 
 * @param rootMargin 
 */
export function useOnScreen(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}