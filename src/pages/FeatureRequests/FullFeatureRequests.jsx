import React from "react";
import { useLocation } from "react-router";
import BackLink from "../../components/BackLink";
import CloseModalLink from "../../components/CloseModalLink";
import VoteControls from "../../components/VoteControls";
import Tag from "../../components/Tag";

export default function FullFeatureRequest() {
  const location = useLocation();
  const id = location.state?.requestId;

  return (
    <section className="full-feature-request-page">
      <h2>Improve Sorting</h2>
      <p>Be able to sort notes by artist and folders by title.</p>
      <p className="date-created">Created on January 4, 2025</p>
      <div>
        <VoteControls />
        <Tag type={"new"} compact={false} />
      </div>
      <p className="description">
        Currently, organizing notes and folders within the app can be
        challenging, especially for users with a large collection of content. To
        enhance usability, we propose adding improved sorting options that allow
        users to sort notes based on the associated artist and arrange folders
        alphabetically by title. This feature would streamline navigation,
        making it easier to locate specific notes and maintain a structured
        library. Additionally, providing ascending and descending sorting
        options for both categories would give users greater control over how
        their content is displayed.
      </p>
      <div>
        <BackLink prevLocation={location.state?.prevLocation} />
        <CloseModalLink prevLocation={location.state?.prevLocation} />
      </div>
    </section>
  );
}
