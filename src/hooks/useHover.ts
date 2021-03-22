import { useRef, useState, useEffect } from 'react';

/**
 * 要素にマウスホバーがあるかどうかを取得するHook
 * 
 * 使用例
 * 
 * const [hoverRef, isHovered] = useHover();
 * <div ref={hoverRef}>{isHovered ? 'hoverring' : ''}</div>
 */
export function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef<HTMLElement>(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);

        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}