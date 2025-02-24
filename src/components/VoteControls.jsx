import React from "react";
import { useOutletContext } from "react-router";
import {
  ArrowShapeDown,
  ArrowShapeUp,
  ArrowShapeUpFill,
  ArrowShapeDownFill,
} from "../icons";

export default function VoteControls({ count = 0, id }) {
  const { fetchFeatureRequests } = useOutletContext();
  const [isUpvoted, setIsUpvoted] = React.useState(false);
  const [isDownvoted, setIsDownvoted] = React.useState(false);
  const [voteCount, setVoteCount] = React.useState(count);
  let endpoint = `/api/feature-requests/${id}/`;

  function toggleUpVote() {
    setIsUpvoted((prev) => !prev);
    setIsDownvoted(false);

    endpoint += "upvote";

    updateVoteCount();
  }

  function toggleDownVote() {
    setIsDownvoted((prev) => !prev);
    setIsUpvoted(false);

    endpoint += "downvote";

    updateVoteCount();
  }

  function updateVoteCount() {
    fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setVoteCount(data.featureRequest.voteCount))
      .catch((err) => {
        console.error(err);
      });

    fetchFeatureRequests();
  }

  return (
    <div className="vote-controls">
      <button
        className="vote-button upvote"
        aria-label="Upvote"
        onClick={toggleUpVote}
      >
        {isUpvoted ? <ArrowShapeUpFill /> : <ArrowShapeUp />}
      </button>
      <p>{voteCount}</p>
      <button
        className="vote-button downvote"
        aria-label="Downvote"
        onClick={toggleDownVote}
      >
        {isDownvoted ? <ArrowShapeDownFill /> : <ArrowShapeDown />}
      </button>
    </div>
  );
}
