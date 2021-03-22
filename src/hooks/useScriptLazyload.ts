import { useState, useEffect } from 'react';

/**
 * スクリプトの遅延ロードHook
 * 
 * 使用例
 * 
 * const status = useScript('https://cdn.aaaa.aaaaa/aa.js');
 * <>
 *  {status === "ready" ? <span>loaded</span> : <span>loading</span>}
 * </>
 * @param src 
 */
export function useScript(src) {
  const [status, setStatus] = useState(src ? "loading" : "idle");
  useEffect(
    () => {
      if (!src) {
        setStatus("idle");
        return;
      }
      let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

      if (!script) {
        script = document.createElement("script") as HTMLScriptElement;
        script.src = src;
        script.async = true;
        script.setAttribute("data-status", "loading");
        document.body.appendChild(script);

        const setAttributeFromEvent = (event) => {
          script.setAttribute(
            "data-status",
            event.type === "load" ? "ready" : "error"
          );
        };

        script.addEventListener("load", setAttributeFromEvent);
        script.addEventListener("error", setAttributeFromEvent);
      } else {
        // @ts-ignore
        setStatus(script.getAttribute("data-status"));
      }

      const setStateFromEvent = (event) => {
        setStatus(event.type === "load" ? "ready" : "error");
      };

      script.addEventListener("load", setStateFromEvent);
      script.addEventListener("error", setStateFromEvent);

      return () => {
        if (script) {
          script.removeEventListener("load", setStateFromEvent);
          script.removeEventListener("error", setStateFromEvent);
        }
      };
    },
    [src] // Only re-run effect if script src changes
  );

  return status;
}