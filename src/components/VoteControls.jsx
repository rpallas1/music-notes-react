import React from "react";
import { useOutletContext } from "react-router";
import formatNumber from "../utils/formatNumber";
import {
  ArrowShapeDown,
  ArrowShapeUp,
  ArrowShapeUpFill,
  ArrowShapeDownFill,
} from "../icons";
import { updateVoteCount } from "../utils/api";
import log from "../utils/log";

/**
 * The VoteControls component displays the upvote and downvote buttons for a feature request.
 *
 * @param {object} props - The component props.
 * @param {number} props.initialVoteCount - The initial vote count for the feature request. Defaults to 0.
 * @param {string} props.id - The ID of the feature request
 */
export default function VoteControls({ featureRequest }) {
  const { fetchFeatureRequests, setIsVoteError } = useOutletContext();
  const [isUpvoted, setIsUpvoted] = React.useState(false);
  const [isDownvoted, setIsDownvoted] = React.useState(false);
  const [voteCount, setVoteCount] = React.useState(
    featureRequest.voteCount || 0,
  );
  const [isUpdatingVote, setIsUpdatingVote] = React.useState(false);
  const id = featureRequest._id || featureRequest.id;

  React.useEffect(() => {
    setVoteCount(featureRequest.voteCount || 0);
  }, [featureRequest]);

  // Check if the feature request has been upvoted or downvoted
  React.useEffect(() => {
    setIsUpvoted(localStorage.getItem(`upvoted-${id}`) === "true");
    setIsDownvoted(localStorage.getItem(`downvoted-${id}`) === "true");
  }, [id]);

  /**
   * Toggle the upvote for the feature request.
   *
   * If the feature request is currently downvoted then two requests are made: One to remove the downvote and one to add the upvote.
   */
  const toggleUpVote = async () => {
    setIsUpdatingVote(true);

    let newVoteValue;

    if (isUpvoted) {
      newVoteValue = -1;
    } else {
      newVoteValue = 1;

      if (isDownvoted) {
        const downvoteRemovalSuccess = await updateFeatureRequest(1);

        if (!downvoteRemovalSuccess) {
          return;
        }
      }
    }

    const success = await updateFeatureRequest(newVoteValue);

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
    setIsUpdatingVote(false);
  };

  /**
   * Toggle the downvote for the feature request.
   *
   * If the feature request is currently upvoted then two requests are made: One to remove the upvote and one to add the downvote.
   */
  const toggleDownVote = async () => {
    setIsUpdatingVote(true);

    let newVoteValue;

    if (isDownvoted) {
      newVoteValue = 1;
    } else {
      newVoteValue = -1;

      if (isUpvoted) {
        const upvoteRemovalSuccess = await updateFeatureRequest(-1);

        if (!upvoteRemovalSuccess) {
          return;
        }
      }
    }

    const success = await updateFeatureRequest(newVoteValue);

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
    setIsUpdatingVote(false);
  };

  /**
   * Update the vote count for the feature request.
   *
   * @param {number} voteValue - The value to add to the vote count.
   * @return {bool} - If the update was successfull.
   */
  const updateFeatureRequest = async (voteValue) => {
    try {
      const data = await updateVoteCount(id, voteValue);

      setVoteCount(data.featureRequest.voteCount);

      return true;
    } catch (err) {
      log.error(err);
      setIsVoteError(true);

      return false;
    }
  };

  return (
    <div className="vote-controls">
      <button
        className="vote-button upvote"
        aria-label="Upvote"
        disabled={isUpdatingVote}
        onClick={toggleUpVote}
      >
        {isUpvoted ? <ArrowShapeUpFill /> : <ArrowShapeUp />}
      </button>
      <p>{formatNumber(voteCount)}</p>
      <button
        className="vote-button downvote"
        aria-label="Downvote"
        disabled={isUpdatingVote}
        onClick={toggleDownVote}
      >
        {isDownvoted ? <ArrowShapeDownFill /> : <ArrowShapeDown />}
      </button>
    </div>
  );
}
