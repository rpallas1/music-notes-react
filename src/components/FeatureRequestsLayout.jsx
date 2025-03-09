import React from "react";
import { Outlet } from "react-router";
import { ToastContainer, toast, Slide } from "react-toastify";
import { ExclamationMarkTriangle } from "../icons";

export default function FeatureRequestsLayout() {
  const [featureRequests, setFeatureRequests] = React.useState([]);
  const [fetchError, setFetchError] = React.useState(null);
  const [isVoteError, setIsVoteError] = React.useState(false);
  const voteErrorId = React.useRef(null);

  const fetchFeatureRequests = async () => {
    fetch("http://localhost:3000/api/v1/feature-requests")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch feature requests");
        }

        return res.json();
      })
      .then((data) => setFeatureRequests(data.featureRequests))
      .catch((err) => {
        setFetchError(err.message);
      });
  };

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
          fetchError,
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
