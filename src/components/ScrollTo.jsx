import React from "react";
import { useLocation } from "react-router";
import { getScrollY, removeScrollY } from "../utils/handleScrollPosition";

/**
 * A component that scrolls to the top of the page when the location changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname === "/feature-requests") {
      const scrollY = getScrollY || 0;

      removeScrollY();
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
