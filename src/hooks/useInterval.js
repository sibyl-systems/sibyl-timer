import { useEffect, useRef } from "react";

function useInterval(callback, [delay, cb]) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        clearInterval(id)
        cb()
      };
    }
  }, [delay]);
}


export default useInterval