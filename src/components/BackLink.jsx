import React from "react";
import { Link } from "react-router";
import { ChevronBackward } from "../icons";

export default function BackLink({
  prevLocation,
  prevSearchParams,
  onBack = () => {},
}) {
  return (
    <Link
      to={{ pathname: prevLocation || "..", search: prevSearchParams }}
      className="back-link mobile-only text-link"
      onClick={onBack}
    >
      <ChevronBackward />
      Back
    </Link>
  );
}
