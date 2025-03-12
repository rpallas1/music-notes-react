import React from "react";
import { useLocation, useOutletContext } from "react-router";
import formatDate from "../../utils/formatDate";
import BackLink from "../../components/BackLink";
import VoteControls from "../../components/VoteControls";
import Tag from "../../components/Tag";
import Spinner from "../../components/Spinner";
import { getFeatureRequest } from "../../utils/api";
import log from "../../utils/log";

export default function FullFeatureRequest() {
  const location = useLocation();
  const id = location.state?.requestId || location.pathname.split("/").pop();
  const { featureRequests } = useOutletContext();
  const [featureRequest, setFeatureRequest] = React.useState(
    featureRequests.find((req) => req._id === id || req.id === id),
  );
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    if (!featureRequest) {
      getFeatureRequest(id)
        .then((data) => {
          setFeatureRequest(data.featureRequest);
        })
        .catch((err) => {
          log.error(err.message);
          setNotFound(true);
        });
    }
  }, []);

  const renderContent = () => {
    if (notFound) {
      return <p className="message">Feature request not found</p>;
    }

    if (featureRequest) {
      return (
        <>
          <h2>{featureRequest.title}</h2>
          <p>{featureRequest.summary}</p>
          <p className="date-created">
            {formatDate(featureRequest.dateCreated)}
          </p>
          <div className="border-bottom">
            <VoteControls
              initialVoteCount={featureRequest.voteCount}
              id={featureRequest._id || featureRequest.id}
            />
            <Tag tag={featureRequest.tag} compact={false} />
          </div>
          <p className="description">{featureRequest.description}</p>
        </>
      );
    }

    return <Spinner delay={750} />;
  };

  return (
    <section className="full-feature-request-page">
      {renderContent()}
      <div className="back-link-container">
        <BackLink prevLocation={location.state?.prevLocation} />
      </div>
    </section>
  );
}
