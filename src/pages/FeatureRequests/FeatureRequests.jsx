import React from "react";
import { Link } from "react-router";
import FeatureRequestCard from "../../components/FeatureRequestCard";

export default function FeatureRequests() {
  return (
    <section className="feature-request-cards-container">
      <FeatureRequestCard type={"new"} />
      <FeatureRequestCard type={"trending"} />
      <FeatureRequestCard type={"under-dev"} />
      <FeatureRequestCard type={"implemented"} />
      <FeatureRequestCard />
    </section>
  );
}
