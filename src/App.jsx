import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import FeatureRequestsLayout from "./components/FeatureRequestsLayout";
import FeatureRequests from "./pages/FeatureRequests/FeatureRequests";
import FullFeatureRequest from "./pages/FeatureRequests/FullFeatureRequests";
import SubmitRequest from "./pages/FeatureRequests/SubmitRequest";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import ScrollTo from "./components/ScrollTo";
// import "./mock-server";

/**
 * The App component is the root component of the application.
 * It sets up the router and defines the routes for the application.
 */
export default function App() {
  return (
    <Router>
      <ScrollTo />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Features />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />

          <Route path="feature-requests" element={<FeatureRequestsLayout />}>
            <Route index element={<FeatureRequests />} />
            <Route path=":id" element={<FullFeatureRequest />} />
          </Route>

          <Route path="submit-request" element={<SubmitRequest />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
