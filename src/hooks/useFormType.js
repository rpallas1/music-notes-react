import React from "react";
import { useLocation } from "react-router";

/**
 * Get the last part of the current pathname.
 *
 * @returns {string} The last part of the current pathname.
 */
const useSavedParams = () => {
  const location = useLocation();

  return location.pathname.split("/").pop();
};

export default useSavedParams;
