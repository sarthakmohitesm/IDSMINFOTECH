import { useState, useEffect, useRef, startTransition } from 'react';

function scheduleIdle(callback) {
  if (typeof requestIdleCallback !== 'undefined') {
    return requestIdleCallback(callback, { timeout: 2500 });
  }
  return setTimeout(callback, 1);
}

function cancelScheduled(id) {
  if (typeof cancelIdleCallback !== 'undefined' && typeof requestIdleCallback !== 'undefined') {
    cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * Loads ClickSpark in a separate chunk after the main thread is idle
 * so it does not compete with first paint or critical hydration.
 */
export default function LazyClickSpark({ children, ...sparkProps }) {
  const [ClickSpark, setClickSpark] = useState(null);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    const idleId = scheduleIdle(() => {
      import('./ClickSpark')
        .then((m) => {
          if (!cancelled.current) {
            startTransition(() => setClickSpark(() => m.default));
          }
        })
        .catch(() => {});
    });
    return () => {
      cancelled.current = true;
      cancelScheduled(idleId);
    };
  }, []);

  if (!ClickSpark) return children;

  return <ClickSpark {...sparkProps}>{children}</ClickSpark>;
}
