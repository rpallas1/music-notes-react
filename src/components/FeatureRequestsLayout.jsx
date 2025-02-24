import React from "react";
import { Outlet } from "react-router";

export default function FeatureRequestsLayout() {
  const [featureRequests, setFeatureRequests] = React.useState([]);

  const fetchFeatureRequests = () => {
    fetch("/api/feature-requests")
      .then((res) => res.json())
      .then((data) => setFeatureRequests(data.featureRequests));
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
