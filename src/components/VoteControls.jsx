import React from "react";
import {
  ArrowShapeDown,
  ArrowShapeUp,
  ArrowShapeUpFill,
  ArrowShapeDownFill,
} from "../icons";

export default function VoteControls({ vote = 0, onVote = () => {} }) {
  const [isUpvoted, setIsUpvoted] = React.useState(false);
  const [isDownvoted, setIsDownvoted] = React.useState(false);
  const [voteCount, setVoteCount] = React.useState(vote);

  function toggleUpVote() {
    setIsUpvoted((prev) => !prev);
    setIsDownvoted(false);
  }

  function toggleDownVote() {
    setIsDownvoted((prev) => !prev);
    setIsUpvoted(false);
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
