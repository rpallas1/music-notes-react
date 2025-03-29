import React from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import FeatureRequestCards from "../../components/FeatureRequestCards";
import FilterDropdown from "../../components/FilterDropdown";
import SortDropdown from "../../components/SortDropdown";
import SearchBar from "../../components/SearchBar";

/**
 * FeatureRequests component is the main page for the Feature Requests section.
 *
 * It displays a list of feature requests and provides options to sort and filter them.
 */
export default function FeatureRequests() {
  return (
    <section className="feature-requests-page">
      <div>
        <h2>Feature Requests</h2>
        <p className="page-description">
          See a feature you like? Give it an upvote! Don&apos;t see a feature
          that Music Notes should have?{" "}
          <Link to="/submit-request" className="text-link">
            Submit a Feature Request!
          </Link>
        </p>
        <div className="options-container">
          <div className="sort-filter-container">
            <SortDropdown />
            <FilterDropdown />
          </div>
          <SearchBar />
        </div>
      </div>
      <FeatureRequestCards />
      <Link to="/submit-request" className="link-btn submit-request-link">
        Submit a Feature Request
      </Link>
    </section>
  );
}
