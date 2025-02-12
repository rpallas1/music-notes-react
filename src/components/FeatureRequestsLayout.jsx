import React from "react";
import { Outlet, Link } from "react-router";

export default function FeatureRequestLayout() {
  return (
    <>
      <h1>Feature Requests</h1>
      <p>
        See a feature you like? Give it an upvote! Don&apos;t see a feature that
        Music Notes should have? Submit a Feature Request!
      </p>
      <p>Search Bar</p>
      <p>Sort Options</p>
      <p>Filter Options</p>
      <Outlet />
      <Link to="submit-request">Submit a Feature Request</Link>
    </>
  );
}
