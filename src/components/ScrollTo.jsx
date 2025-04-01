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
    window.scrollTo({ top: scrollY, behavior: "smooth" });
  } else {
    window.scrollTo(0, 0);
  }

  return null;
}
