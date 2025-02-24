import React from "react";
import { Link, useOutletContext, useSearchParams } from "react-router";
import formatDate from "../utils/formatDate";
import truncate from "../utils/truncate";
import VoteControls from "./VoteControls";
import Tag from "./Tag";

export default function FeatureRequestsLayout() {
  const { featureRequests } = useOutletContext();
  const [searchParams] = useSearchParams();

  const cardEls = featureRequests
    .filter((featureRequest) => {
      if (!searchParams.has("tag")) {
        return true;
      }

      const tagFilters = searchParams.get("tag").split(",");

      if (featureRequest.tag) {
        return tagFilters.includes(featureRequest.tag);
      }
    })
    .filter((featureRequest) => {
      if (!searchParams.has("date")) {
        return true;
      }

      const dateFilters = searchParams.get("date").split(",");
      const currentDate = searchParams.get("current-date") || new Date();
      const dateDiff = Math.abs(currentDate - featureRequest.dateCreated);

      if (dateFilters.includes("past-week")) {
        return dateDiff <= 604800000;
      }

      if (dateFilters.includes("past-month")) {
        return dateDiff <= 2592000000;
      }

      if (dateFilters.includes("past-year")) {
        return dateDiff <= 31536000000;
      }
    })
    .filter((featureRequest) => {
      if (!searchParams.has("search")) {
        return true;
      }

      const searchQuery = decodeURI(searchParams.get("search").toLowerCase());

      if (featureRequest.title.toLowerCase().includes(searchQuery)) {
        return true;
      }

      if (featureRequest.summary.toLowerCase().includes(searchQuery)) {
        return true;
      }

      if (featureRequest.description.toLowerCase().includes(searchQuery)) {
        return true;
      }
    })
    .sort((a, b) => {
      if (!searchParams.has("sort")) {
        const lhs = new Date(a.dateCreated);
        const rhs = new Date(b.dateCreated);

        return lhs - rhs;
      }

      const sortType = searchParams.get("sort");

      if (sortType === "upvotes") {
        return b.voteCount - a.voteCount;
      }
    })
    .map((featureRequest) => (
      <div className="feature-request-card" key={featureRequest.id}>
        <div>
          <div>
            <h3>{featureRequest.title}</h3>
            <p>
              {featureRequest.summary.length > 0 ? (
                <>{truncate(featureRequest.summary, 120)}</>
              ) : (
                <>{truncate(featureRequest.description, 120)}</>
              )}
            </p>
            <Link
              to={featureRequest.id}
              className="view-request text-link"
              state={{
                requestId: featureRequest.id,
                prevLocation: location.pathname,
              }}
            >
              Read More
            </Link>
          </div>
          {featureRequest.tag && (
            <Tag tag={featureRequest.tag} compact={true} />
          )}
        </div>
        <div>
          <VoteControls
            count={featureRequest.voteCount}
            id={featureRequest.id}
          />
          <p className="date-created">
            Created on {formatDate(featureRequest.dateCreated)}
          </p>
        </div>
      </div>
    ));

  const renderContent = () => {
    if (featureRequests.length === 0) {
      return <p>Loading...</p>;
    } else if (cardEls.length > 0) {
      return cardEls;
    } else {
      return <p>No feature requests found.</p>;
    }
  };

  return (
    <section className="feature-request-cards-container">
      {renderContent()}
    </section>
  );
}
