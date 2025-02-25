import React from "react";
import { useOutletContext } from "react-router";
import formatNumber from "../utils/formatNumber";
import {
  ArrowShapeDown,
  ArrowShapeUp,
  ArrowShapeUpFill,
  ArrowShapeDownFill,
} from "../icons";

export default function VoteControls({ count = 0, id }) {
  const { fetchFeatureRequests } = useOutletContext();
  const [isUpvoted, setIsUpvoted] = React.useState(
    localStorage.getItem(`upvoted-${id}`) === "true" || false,
  );
  const [isDownvoted, setIsDownvoted] = React.useState(
    localStorage.getItem(`downvoted-${id}`) === "true" || false,
  );
  const [voteCount, setVoteCount] = React.useState(
    localStorage.getItem(`voteCount-${id}`) || count,
  );
  const namespace = `/api/feature-requests/${id}/`;
  let endpoint = namespace;

  function toggleUpVote() {
    endpoint += isUpvoted ? "downvote" : "upvote";

    updateVoteCount();

    if (isDownvoted) {
      endpoint = namespace + "upvote";
      updateVoteCount();
    }

    setIsUpvoted((prev) => {
      localStorage.setItem(`upvoted-${id}`, !prev);

      return !prev;
    });

    setIsDownvoted(false);
    localStorage.removeItem(`downvoted-${id}`);
  }

  function toggleDownVote() {
    endpoint += isDownvoted ? "upvote" : "downvote";

    updateVoteCount();

    if (isUpvoted) {
      endpoint = namespace + "downvote";
      updateVoteCount();
    }

    setIsDownvoted((prev) => {
      localStorage.setItem(`downvoted-${id}`, !prev);

      return !prev;
    });

    setIsUpvoted(false);
    localStorage.removeItem(`upvoted-${id}`);
  }

  function updateVoteCount() {
    fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVoteCount(data.featureRequest.voteCount);
        localStorage.setItem(`voteCount-${id}`, data.featureRequest.voteCount);
      })
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
      <p>{formatNumber(voteCount)}</p>
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
