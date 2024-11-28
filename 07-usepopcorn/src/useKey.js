import { useEffect } from "react";

export function useKey(keyCode, action) {
  useEffect(() => {
    const cback = (e) => {
      if (e.keyCode === keyCode) {
        action();
      }
    };

    document.addEventListener("keydown", cback);

    return () => document.removeEventListener("keydown", cback);
  }, [keyCode, action]);
}
