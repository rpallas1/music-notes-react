import React from "react";
import { useLocation } from "react-router";

/**
 * A component that scrolls to the top of the page when the location changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
