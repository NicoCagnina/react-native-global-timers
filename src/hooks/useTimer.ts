import { useEffect, useRef } from 'react';
import { useTimerContext } from '../providers/TimerProvider';

export const useTimer = (callback: () => void) => {
  const { subscribe, unsubscribe } = useTimerContext();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handle = subscribe(() => callbackRef.current());
    return () => unsubscribe(handle.id);
  }, []);
};
