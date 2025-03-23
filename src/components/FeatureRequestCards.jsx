import React from "react";
import { Link, useOutletContext, useSearchParams } from "react-router";
import truncate from "../utils/truncate";
import formatDate from "../utils/formatDate";
import Tag from "./Tag";
import VoteControls from "./VoteControls";
import { MagnifyingGlass, Line3HorizontalDecrease } from "../icons";
import log from "../utils/log";

export default function FeatureRequestCards() {
  const { featureRequests, fetchError, isLoading } = useOutletContext();
  const [searchParams] = useSearchParams();
  const [showShimmer, setShowShimmer] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setShowShimmer(true), 1000);
  }, []);

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
      const dateCreated = new Date(featureRequest.dateCreated);
      const dateDiff = Math.abs(currentDate - dateCreated);

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

      const searchQuery = decodeURI(
        searchParams.get("search").trim().toLowerCase(),
      );

      if (featureRequest.title.toLowerCase().includes(searchQuery)) {
        return true;
      }

      if (featureRequest.summary?.toLowerCase().includes(searchQuery)) {
        return true;
      }

      if (featureRequest.description.toLowerCase().includes(searchQuery)) {
        return true;
      }
    })
    .sort((a, b) => {
      if (!searchParams.has("sort")) {
        const lhs = new Date(b.dateCreated);
        const rhs = new Date(a.dateCreated);

        return lhs - rhs;
      }

      const sortType = searchParams.get("sort");

      if (sortType === "upvotes") {
        return b.voteCount - a.voteCount;
      }
    })
    .map((featureRequest) => (
      <div
        className="feature-request-card"
        key={featureRequest._id || featureRequest.id}
      >
        <div>
          <div>
            <h3>{featureRequest.title}</h3>
            <p>
              {featureRequest.summary?.length > 0
                ? truncate(featureRequest.summary, 120)
                : truncate(featureRequest.description, 120)}
            </p>
            <Link
              to={featureRequest._id || featureRequest.id}
              className="view-request text-link"
              state={{
                requestId: featureRequest._id || featureRequest.id,
                prevLocation: location.pathname,
              }}
            >
              Read More
              <span className="sr-only"> about this feature request</span>
            </Link>
          </div>
          {featureRequest.tag && (
            <Tag tag={featureRequest.tag} compact={true} />
          )}
        </div>
        <div>
          <VoteControls
            initialVoteCount={featureRequest.voteCount}
            id={featureRequest._id || featureRequest.id}
          />
          <p className="date-created">
            Created on {formatDate(featureRequest.dateCreated)}
          </p>
        </div>
      </div>
    ));

  if (searchParams.get("isDescending") === "true") {
    cardEls.reverse();
  }

  const renderContent = () => {
    if (fetchError) {
      return (
        <p className="message">{`${fetchError}. Please try again later.`}</p>
      );
    }

    if (cardEls.length === 0 && isLoading) {
      return (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="feature-request-card skeleton">
              {/* TODO: Add shimmer class after timeout */}
              <div className="title"></div>
              <div className="summary"></div>
              <div className="date-created"></div>
            </div>
          ))}
        </>
      );
    }

    if (cardEls.length > 0) {
      return cardEls;
    }

    if (searchParams.has("search")) {
      return (
        <div className="no-results">
          <MagnifyingGlass />
          <p className="message">
            No results for &quot;{decodeURI(searchParams.get("search"))}&quot;
          </p>
          <p className="message">
            Check your spelling or try a different search term.
          </p>
        </div>
      );
    }

    if (searchParams.has("tag") || searchParams.has("date")) {
      return (
        <div className="no-results">
          <Line3HorizontalDecrease />
          <p className="message">
            No feature requests found with the selected filters.
          </p>
        </div>
      );
    }

    return <p className="no-results message">No feature requests found.</p>;
  };

  return (
    <section className="feature-request-cards-container">
      {renderContent()}
    </section>
  );
}
