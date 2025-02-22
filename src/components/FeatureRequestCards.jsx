import React from "react";
import { Link } from "react-router";
import VoteControls from "./VoteControls";
import Tag from "./Tag";

export default function FeatureRequestsLayout() {
  const [featureRequests, setFeatureRequests] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/feature-requests")
      .then((res) => res.json())
      .then((data) => setFeatureRequests(data.featureRequests));
  }, []);

  const cardEls = featureRequests.map((featureRequest) => (
    <div className="feature-request-card" key={featureRequest.id}>
      <div>
        <div>
          <h3>{featureRequest.title}</h3>
          <p>
            {featureRequest.summary.length > 0 ? (
              featureRequest.summary
            ) : (
              <>{`${featureRequest.description.substring(0, 100)}...`}</>
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
        {featureRequest.tag && <Tag tag={featureRequest.tag} compact={true} />}
      </div>
      <div>
        <VoteControls count={featureRequest.voteCount} />
        <p className="date-created">Created on {featureRequest.dateCreated}</p>
      </div>
    </div>
  ));

  return (
    <section className="feature-request-cards-container">
      {featureRequests.length > 0 ? <>{cardEls}</> : <p>Loading...</p>}
    </section>
  );
}
