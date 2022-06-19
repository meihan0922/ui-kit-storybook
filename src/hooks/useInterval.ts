import { useRef, useEffect } from "react";

const useInterval = (callback, delay = 1000) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const timer = setInterval(() => {
      callbackRef.current();
    }, delay);
    return () => clearInterval(timer);
  }, [delay]);
};

export default useInterval;
