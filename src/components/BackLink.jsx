import React from "react";
import { Link } from "react-router";
import { ChevronBackward } from "../icons";

export default function BackLink({ prevLocation }) {
  return (
    <Link to={prevLocation || ".."} className="back-link mobile-only text-link">
      <ChevronBackward />
      Back
    </Link>
  );
}
