import React from "react";
import { Outlet } from "react-router";
import { ToastContainer, toast, Slide } from "react-toastify";
import { ExclamationMarkTriangle } from "../icons";
import { getFeatureRequests } from "../utils/api";

export default function FeatureRequestsLayout() {
  const [featureRequests, setFeatureRequests] = React.useState([]);
  const [fetchError, setFetchError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVoteError, setIsVoteError] = React.useState(false);

  const fetchFeatureRequests = async () => {
    setIsLoading(true);

    try {
      const data = await getFeatureRequests();
      setTimeout(() => {
        setFeatureRequests(data.featureRequests);
      }, 5000);
      // setFeatureRequests(data.featureRequests);
    } catch (err) {
      setFetchError("Network request failed");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
      // setIsLoading(false);
    }
  };

  const voteErrorId = React.useRef(null);

  React.useEffect(() => {
    fetchFeatureRequests();
  }, []);

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
