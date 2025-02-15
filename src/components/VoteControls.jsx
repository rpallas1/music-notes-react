import React from "react";
import {
  ArrowShapeDown,
  ArrowShapeUp,
  ArrowShapeUpFill,
  ArrowShapeDownFill,
} from "../icons";

export default function VoteControls({ vote, onVote }) {
  return (
    <div className="vote-controls">
      <button className="vote-button upvote" aria-label="Upvote">
        <ArrowShapeUpFill />
      </button>
      <p>14</p>
      <button className="vote-button downvote" aria-label="Downvote">
        <ArrowShapeDown />
      </button>
    </div>
  );
}
