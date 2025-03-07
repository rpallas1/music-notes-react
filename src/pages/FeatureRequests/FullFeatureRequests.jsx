import React from "react";
import { useLocation, useOutletContext } from "react-router";
import formatDate from "../../utils/formatDate";
import BackLink from "../../components/BackLink";
import CloseModalLink from "../../components/CloseModalLink";
import VoteControls from "../../components/VoteControls";
import Tag from "../../components/Tag";

export default function FullFeatureRequest() {
  const location = useLocation();
  const id = location.state?.requestId || location.pathname.split("/").pop();
  const { featureRequests } = useOutletContext();
  const [featureRequest, setFeatureRequest] = React.useState(
    featureRequests.find((req) => req._id === id),
  );

  React.useEffect(() => {
    if (!featureRequest) {
      fetch(`http://localhost:3000/api/v1/feature-requests/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFeatureRequest(data.featureRequest);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <>
      {featureRequest ? (
        <section className="full-feature-request-page">
          <h2>{featureRequest.title}</h2>
          <p>{featureRequest.summary}</p>
          <p className="date-created">
            {formatDate(featureRequest.dateCreated)}
          </p>
          <div>
            <VoteControls
              count={featureRequest.voteCount}
              id={featureRequest._id}
            />
            <Tag tag={featureRequest.tag} compact={false} />
          </div>
          <p className="description">{featureRequest.description}</p>
          <div>
            <BackLink prevLocation={location.state?.prevLocation} />
            <CloseModalLink prevLocation={location.state?.prevLocation} />
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
