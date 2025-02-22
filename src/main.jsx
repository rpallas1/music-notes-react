import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router";
import Layout from "./components/Layout";
import FeatureRequestsLayout from "./components/FeatureRequestsLayout";
import FeatureRequests from "./pages/FeatureRequests/FeatureRequests";
import FullFeatureRequest from "./pages/FeatureRequests/FullFeatureRequests";
import SubmitRequest from "./pages/FeatureRequests/SubmitRequest";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

import "./mock-server";

function App() {
  function ScorllToTop() {
    const { pathname } = useLocation();

    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <Router>
      <ScorllToTop />
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

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
