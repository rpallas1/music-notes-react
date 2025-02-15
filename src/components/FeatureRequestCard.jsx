import React from "react";
import { Link } from "react-router";
import VoteControls from "./VoteControls";

export default function FeatureRequestCard() {
  return (
    <div className="feature-request-card">
      <div>
        <h3>Improve Sorting</h3>
        <p>Be able to sort notes by artist and folders by title.</p>
        <Link to="1" className="view-request">
          Read Mode
        </Link>
      </div>
      <div>
        <VoteControls />
        <p className="date-create">Created on January 4, 2025</p>
      </div>
    </div>
  );
}
