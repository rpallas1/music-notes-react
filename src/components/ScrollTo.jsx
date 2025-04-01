import React from "react";
import { useLocation } from "react-router";
import { getScrollY, removeScrollY } from "../utils/handleScrollPosition";

/**
 * A component that scrolls to the top of the page when the location changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const scrollY = getScrollY() || 0;

  if (pathname === "/feature-requests") {
    window.scrollTo({
      top: scrollY,
      behavior: scrollY === 0 ? "instant" : "smooth",
    });

    setTimeout(removeScrollY, 300);
  } else {
    window.scrollTo(0, 0);

    if (
      pathname !== "/submit-request" &&
      !pathname.includes("/feature-requests/")
    ) {
      setTimeout(removeScrollY, 300);
    }
  }

  return null;
}
