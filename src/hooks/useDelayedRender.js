import React from "react";

/**
 * The useDelayedRender hook is a custom hook that delays rendering of a component
 *
 * @param {number} delay - The delay in milliseconds
 * @returns {function} A function that can be called to render the component
 */
export default function useDelayedRender(delay = 1000) {
  const [delayed, setIsDelayed] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsDelayed(false), delay);

    return () => clearTimeout(timeout);
  }, []);

  return (fn) => !delayed && fn();
}
