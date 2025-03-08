import React from "react";
import { useOutletContext } from "react-router";
import formatNumber from "../utils/formatNumber";
import {
  ArrowShapeDown,
  ArrowShapeUp,
  ArrowShapeUpFill,
  ArrowShapeDownFill,
} from "../icons";

export default function VoteControls({ initialVoteCount = 0, id }) {
  const { fetchFeatureRequests, setIsVoteError } = useOutletContext();
  const [isUpvoted, setIsUpvoted] = React.useState(false);
  const [isDownvoted, setIsDownvoted] = React.useState(false);
  const [voteCount, setVoteCount] = React.useState(initialVoteCount);

  React.useEffect(() => {
    setIsUpvoted(localStorage.getItem(`upvoted-${id}`) === "true");
    setIsDownvoted(localStorage.getItem(`downvoted-${id}`) === "true");
  }, [id]);

  const toggleUpVote = async () => {
    let newVoteValue;

    if (isUpvoted) {
      newVoteValue = -1;
    } else {
      newVoteValue = 1;

      if (isDownvoted) {
        const downvoteRemovalSuccess = await updateVoteCount(1);

        if (!downvoteRemovalSuccess) {
          return;
        }
      }
    }

    const success = await updateVoteCount(newVoteValue);

    if (!success) {
      return;
    }

    const newUpvotedState = !isUpvoted;
    setIsUpvoted(newUpvotedState);
    localStorage.setItem(`upvoted-${id}`, newUpvotedState);

    if (isDownvoted) {
      setIsDownvoted(false);
      localStorage.removeItem(`downvoted-${id}`);
    }

    fetchFeatureRequests();
  };

  const toggleDownVote = async () => {
    let newVoteValue;

    if (isDownvoted) {
      newVoteValue = 1;
    } else {
      newVoteValue = -1;

      if (isUpvoted) {
        const upvoteRemovalSuccess = await updateVoteCount(-1);

        if (!upvoteRemovalSuccess) {
          return;
        }
      }
    }

    const success = await updateVoteCount(newVoteValue);

    if (!success) {
      return;
    }

    const newDownvotedState = !isDownvoted;
    setIsDownvoted(newDownvotedState);
    localStorage.setItem(`downvoted-${id}`, newDownvotedState);

    if (isUpvoted) {
      setIsUpvoted(false);
      localStorage.removeItem(`upvoted-${id}`);
    }

    fetchFeatureRequests();
  };

  const updateVoteCount = async (voteValue) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/feature-requests/${id}/votes`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: voteValue,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update vote count");
      }

      const data = await res.json();
      setVoteCount(data.featureRequest.voteCount);

      return true;
    } catch (err) {
      console.error(err);
      setIsVoteError(true);
      return false;
    }
  };

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
