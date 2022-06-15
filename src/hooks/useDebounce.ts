import { useState, useEffect } from "react";

const useDebounce = (val, delay) => {
  const [newVal, setVal] = useState(val);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVal(val);
    }, delay);
    return () => clearTimeout(timer);
  }, [val, delay]);

  return newVal;
};

export default useDebounce;
