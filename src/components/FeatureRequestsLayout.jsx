import React from "react";
import { Outlet, useLocation } from "react-router";
import { ToastContainer, toast, Slide } from "react-toastify";
import { ExclamationMarkTriangle } from "../icons";
import { getFeatureRequests } from "../utils/api";

/**
 * The layout for the feature requests page.
 *
 * Responsible for fetching the feature requests data and providing context to the children.
 */
export default function FeatureRequestsLayout() {
  const { pathname } = useLocation();
  const [featureRequests, setFeatureRequests] = React.useState(
    JSON.parse(sessionStorage.getItem("feature-requests")) || [],
  );
  const [fetchError, setFetchError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVoteError, setIsVoteError] = React.useState(false);

  /**
   * Fetches the feature requests data from the server.
   *
   * Sets the feature requests state if the request is successful as well as the loading state.
   */
  const fetchFeatureRequests = async () => {
    setIsLoading(true);

    try {
      const data = await getFeatureRequests();
      // setTimeout(() => {
      //   sessionStorage.setItem(
      //     "feature-requests",
      //     JSON.stringify(data.featureRequests),
      //   );
      //   setFeatureRequests(data.featureRequests);
      //   console.log("data saved");
      // }, 5000);

      sessionStorage.setItem(
        "feature-requests",
        JSON.stringify(data.featureRequests),
      );
      setFeatureRequests(data.featureRequests);
    } catch (err) {
      setFetchError("Network request failed");
    } finally {
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 5000);
      setIsLoading(false);
    }
  };

  const voteErrorId = React.useRef(null);

  React.useEffect(() => {
    fetchFeatureRequests();
  }, [pathname]);

  // Display a toast notification if there is a vote error
  React.useEffect(() => {
    if (!isVoteError) {
      return;
    }

    toast.dismiss(voteErrorId.current);

    if (!toast.isActive(voteErrorId.current)) {
      voteErrorId.current = toast.error("Failed to update vote", {
        onClose: () => setIsVoteError(false),
      });
    }
  }, [isVoteError, setIsVoteError]);

  return (
    <>
      <Outlet
        context={{
          featureRequests,
          fetchFeatureRequests,
          fetchError,
          isLoading,
          isVoteError,
          setIsVoteError,
        }}
      />

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        transition={Slide}
        limit={1}
        icon={<ExclamationMarkTriangle />}
      />
    </>
  );
}
