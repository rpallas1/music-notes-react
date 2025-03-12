import React from "react";

export default function useDelayedRender(delay = 1000) {
  const [delayed, setIsDelayed] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsDelayed(false), delay);

    return () => clearTimeout(timeout);
  }, []);

  return (fn) => !delayed && fn();
}
