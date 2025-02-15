import React from "react";
import { Link } from "react-router";
import VoteControls from "./VoteControls";
import Tag from "./Tag";

export default function FeatureRequestCard({ type }) {
  return (
    <div className="feature-request-card">
      <div>
        <div>
          <h3>Improve Sorting</h3>
          <p>Be able to sort notes by artist and folders by title.</p>
          <Link
            to="1"
            className="view-request"
            state={{ requestId: "1", prevLocation: location.pathname }}
          >
            Read More
          </Link>
        </div>
        {type && <Tag type={type} compact={true} />}
      </div>
      <div>
        <VoteControls />
        <p className="date-created">Created on January 4, 2025</p>
      </div>
    </div>
  );
}
