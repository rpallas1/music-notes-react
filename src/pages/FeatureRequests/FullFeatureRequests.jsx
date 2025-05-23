import React from "react";
import { useLocation, useOutletContext } from "react-router";
import formatDate from "../../utils/formatDate";
import BackLink from "../../components/BackLink";
import VoteControls from "../../components/VoteControls";
import Tag from "../../components/Tag";
import Spinner from "../../components/Spinner";
import { getFeatureRequest } from "../../utils/api";
import log from "../../utils/log";

/**
 * The FullFeatureRequest component displays the full feature request.
 *
 * It shows the title, summary, description, date created, vote count, and tag.
 */
export default function FullFeatureRequest() {
  const location = useLocation();
  const id = location.state?.requestId || location.pathname.split("/").pop();
  const { featureRequests } = useOutletContext();
  const [featureRequest, setFeatureRequest] = React.useState(
    featureRequests.find((req) => req._id === id || req.id === id),
  );
  const [notFound, setNotFound] = React.useState(false);

  // Fetch the feature request if it's not already in the context
  React.useEffect(() => {
    getFeatureRequest(id)
      .then((data) => {
        // setTimeout(() => setFeatureRequest(data.featureRequest), 5000);
        setFeatureRequest(data.featureRequest);
      })
      .catch((err) => {
        log.error(err.message);
        setNotFound(true);
      });
  }, [id]);

  /**
   * Renders the content of the page.
   *
   * If the feature request is not found, it displays a message.
   * If the feature request is found, it displays the feature request details.
   * If the feature request is not yet loaded, it displays a spinner.
   */
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
            <VoteControls featureRequest={featureRequest} />
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
        <BackLink />
      </div>
    </section>
  );
}
