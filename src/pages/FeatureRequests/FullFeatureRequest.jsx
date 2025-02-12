import React from "react";
import { Link } from "react-router";

export default function FullFeatureRequest() {
  return (
    <section>
      <h2>Feature Request 1</h2>
      <p>Summary of request</p>
      <Link to=".." className="close-modal">
        X
      </Link>
    </section>
  );
}
