import React from "react";
import { Link } from "react-router";
import { ChevronBackward } from "../icons";

/**
 * A back link that navigates to the previous location.
 *
 * @param {object} props - The component props.
 * @param {string} props.prevLocation - The previous location.
 * @param {string} props.prevSearchParams - The previous search params.
 * @param {function} props.onBack - The callback function to call when the back link is clicked. Defaults to an empty function.
 */
export default function BackLink({
  prevLocation,
  prevSearchParams,
  onBack = () => {},
}) {
  return (
    <Link
      to={{ pathname: prevLocation || "..", search: prevSearchParams }}
      className="back-link text-link"
      onClick={onBack}
    >
      <ChevronBackward />
      Back
    </Link>
  );
}
