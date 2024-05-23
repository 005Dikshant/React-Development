import { useState, useEffect } from "react";

export function useLocalStorageState(initialItem, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialItem;
  });

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
