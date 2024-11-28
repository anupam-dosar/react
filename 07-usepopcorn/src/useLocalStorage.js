import { useState, useEffect } from "react";

export function useLocalStorage(initialState, key) {
  const [val, setVal] = useState(() => {
    const data = localStorage.getItem(key);

    return data === null ? initialState : JSON.parse(data);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [val, key]);

  return [val, setVal];
}
