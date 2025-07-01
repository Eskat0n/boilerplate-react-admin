import { useMemo, useRef } from "react";

export type Listener<T = any> = (data: T) => void;
export type Dispatcher<T = any> = (data: T) => void;

export type EventBus<T> = {
  addListener: (listener: Listener<T>) => void;
  removeListener: (listener: Listener<T>) => void;
};

export const useEventBus = function <T>(): [EventBus<T>, Dispatcher<T>] {
  const listeners = useRef<Listener<T>[]>([]);
  const eventBus = useMemo<EventBus<T>>(() => ({
    addListener: listener => {
      const index = listeners.current.indexOf(listener);
      if (index > -1)
        return;

      listeners.current.push(listener);
    },
    removeListener: listener => {
      const index = listeners.current.indexOf(listener);
      if (index <= -1)
        return;

      listeners.current.splice(index, 1);
    }
  }), []);

  return useMemo(() => [
    eventBus,
    (data: T) => setTimeout(() => listeners.current.forEach(listener => listener(data)), 10)
  ], [eventBus]);
};
