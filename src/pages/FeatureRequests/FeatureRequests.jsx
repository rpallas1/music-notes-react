import React from "react";
import { Link } from "react-router";
import FeatureRequestCard from "../../components/FeatureRequestCard";

export default function FeatureRequests() {
  return (
    <section className="feature-request-cards-container">
      <FeatureRequestCard />
      <FeatureRequestCard />
      <FeatureRequestCard />
      <FeatureRequestCard />
    </section>
  );
}
