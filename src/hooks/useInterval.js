import { useEffect, useRef } from "react";

const useInterval = (callback, [delay, cb]) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        cb()
        clearInterval(id)
      };
    }
  }, [delay]);
}


export default useInterval