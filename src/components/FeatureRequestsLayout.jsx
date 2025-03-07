import React from "react";
import { Outlet } from "react-router";

export default function FeatureRequestsLayout() {
  const [featureRequests, setFeatureRequests] = React.useState([]);

  const fetchFeatureRequests = () => {
    // fetch("/api/feature-requests")
    //   .then((res) => res.json())
    //   .then((data) => setFeatureRequests(data.featureRequests));
    fetch("http://localhost:3000/api/v1/feature-requests")
      .then((res) => res.json())
      .then((data) => setFeatureRequests(data.featureRequests))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    fetchFeatureRequests();
  }, []);

  return (
    <Outlet
      context={{
        featureRequests,
        fetchFeatureRequests,
      }}
    />
  );
}
