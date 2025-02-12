import React from "react";
import { Link } from "react-router";
import { XCircleFill } from "../../icons";

export default function SubmitRequest() {
  return (
    <>
      <h2>Submit a Feature Request</h2>
      <p>How to submit a feature request</p>
      <Link to=".." className="close-modal">
        <XCircleFill />
      </Link>
    </>
  );
}
