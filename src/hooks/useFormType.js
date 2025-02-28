import React from "react";
import { useLocation } from "react-router";

const useSavedParams = () => {
  const location = useLocation();

  return location.pathname.split("/").pop();
};

export default useSavedParams;
