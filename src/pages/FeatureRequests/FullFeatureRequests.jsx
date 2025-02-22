import React from "react";
import { useLocation } from "react-router";
import BackLink from "../../components/BackLink";
import CloseModalLink from "../../components/CloseModalLink";
import VoteControls from "../../components/VoteControls";
import Tag from "../../components/Tag";

export default function FullFeatureRequest() {
  const location = useLocation();
  const id = location.state?.requestId;
  const [featureRequest, setFeatureRequest] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/feature-requests/${id}`)
      .then((res) => res.json())
      .then((data) => setFeatureRequest(data.featureRequest));
  }, []);

  return (
    <section className="full-feature-request-page">
      {featureRequest ? (
        <>
          <h2>{featureRequest.title}</h2>
          <p>{featureRequest.summary}</p>
          <p className="date-created">{featureRequest.dateCreated}</p>
          <div>
            <VoteControls count={featureRequest.voteCount} />
            <Tag tag={featureRequest.tag} compact={false} />
          </div>
          <p className="description">{featureRequest.description}</p>
          <div>
            <BackLink prevLocation={location.state?.prevLocation} />
            <CloseModalLink prevLocation={location.state?.prevLocation} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
