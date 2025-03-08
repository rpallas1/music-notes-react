import React from "react";
import { Outlet } from "react-router";
import { ToastContainer, toast, Slide } from "react-toastify";
import { ExclamationMarkTriangle } from "../icons";

export default function FeatureRequestsLayout() {
  const [featureRequests, setFeatureRequests] = React.useState([]);
  const [isFetchError, setIsFetchError] = React.useState(false);
  const [isVoteError, setIsVoteError] = React.useState(false);
  const voteErrorId = "vote-error-toast";

  const fetchFeatureRequests = () => {
    fetch("http://localhost:3000/api/v1/feature-requests")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch feature requests");
        }

        return res.json();
      })
      .then((data) => setFeatureRequests(data.featureRequests))
      .catch((err) => {
        console.error(err);
        setIsFetchError(true);
      });
  };

  React.useEffect(() => {
    if (!isVoteError) {
      return;
    }

    toast.error("Failed to update vote", {
      toastId: voteErrorId,
    });
  }, [isVoteError]);

  React.useEffect(() => {
    fetchFeatureRequests();
  }, []);

  return (
    <>
      <Outlet
        context={{
          featureRequests,
          fetchFeatureRequests,
          isFetchError,
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
        icon={({ type }) => {
          switch (type) {
            case "error":
              return <ExclamationMarkTriangle className="stroke-red-500" />;
            default:
              return null;
          }
        }}
      />
    </>
  );
}
