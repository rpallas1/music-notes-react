import React from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  ChevronDown,
  ChevronUp,
  MagnifyingGlass,
  Line3HorizontalDecrease,
  XCircleFill,
} from "../icons";

export default function FeatureRequestLayout() {
  const location = useLocation();
  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = React.useState(false);
  const [filterOptions, setFilterOptions] = React.useState({
    trending: false,
    new: false,
    implemented: false,
    underDev: false,
    pastWeek: false,
    pastMonth: false,
    pastYear: false,
  });
  const [areFilterApplied, setAreFilterApplied] = React.useState(false);
  const [isSearchBarActive, setIsSearchBarActive] = React.useState(false);
  const [isSearchBarFocused, setIsSearchBarFocused] = React.useState(false);

  function updateFilters(e) {
    setFilterOptions((prev) => {
      return {
        ...prev,
        [e.target.value]: e.target.checked,
      };
    });
  }

  function toggleFilterVisibility() {
    setIsFilterOptionsOpen((prev) => !prev);
  }

  function applyFilters(e) {
    e.preventDefault();
    toggleFilterVisibility();
    setAreFilterApplied(Object.values(filterOptions).some((option) => option));
  }

  function clearFilters(e) {
    e.preventDefault();

    const filterOptionsForm = document.getElementById("filter-options-form");
    filterOptionsForm.reset();

    setAreFilterApplied(false);
    setFilterOptions({
      trending: false,
      new: false,
      implemented: false,
      underDev: false,
      pastWeek: false,
      pastMonth: false,
      pastYear: false,
    });
  }

  function clearSearchBar() {
    const searchBar = document.getElementById("search");
    searchBar.value = "";

    setIsSearchBarActive(false);
    focusSearchBar();
  }

  function handleSearchBarChange(e) {
    if (e.target.value) {
      setIsSearchBarActive(true);
    } else {
      setIsSearchBarActive(false);
    }
  }

  function handleSearchCancel() {
    clearSearchBar();
    setIsSearchBarActive(false);
    setIsSearchBarFocused(false);
    document.getElementById("search").blur();
  }

  function handleOnBlur() {
    if (document.getElementById("search").value === "") {
      setIsSearchBarFocused(false);
    }
  }

  function focusSearchBar() {
    document.getElementById("search").focus();
    setIsSearchBarFocused(true);
  }

  return (
    <div className="feature-requests-page">
      <h2>Feature Requests</h2>
      <p>
        See a feature you like? Give it an upvote! Don&apos;t see a feature that
        Music Notes should have? Submit a Feature Request!
      </p>
      <div className="options-container">
        <div className="sort-options-container">
          <label htmlFor="sort-options">Sort By</label>
          <select name="sort-options" id="sort-options" className="options-btn">
            <option value="date-created">Date Created</option>
            <option value="upvotes">Upvotes</option>
          </select>
        </div>
        <div className="filter-options-container">
          <button
            className={`filter-options-btn options-btn ${isFilterOptionsOpen ? "dimmed" : null} ${!areFilterApplied ? "inactive" : null}`}
            onClick={toggleFilterVisibility}
          >
            Filters <Line3HorizontalDecrease />
          </button>
          {isFilterOptionsOpen && (
            <div className="filter-options">
              <form id="filter-options-form" onSubmit={applyFilters}>
                <fieldset>
                  <legend>Tags</legend>
                  <div className="tags">
                    <input
                      type="checkbox"
                      id="trending"
                      name="tag-option"
                      value="trending"
                      className="hidden"
                      onChange={(e) => updateFilters(e)}
                      checked={filterOptions.trending}
                    />
                    <label htmlFor="trending">Trending</label>
                    <input
                      type="checkbox"
                      id="new"
                      name="tag-option"
                      value="new"
                      className="hidden"
                      onChange={(e) => updateFilters(e)}
                      checked={filterOptions.new}
                    />
                    <label htmlFor="new">New</label>
                    <input
                      type="checkbox"
                      id="implemeted"
                      name="tag-option"
                      value="implemented"
                      className="hidden"
                      onChange={(e) => updateFilters(e)}
                      checked={filterOptions.implemented}
                    />
                    <label htmlFor="implemeted">Implemented</label>
                    <input
                      type="checkbox"
                      id="underDev"
                      name="tag-option"
                      value="underDev"
                      className="hidden"
                      onChange={(e) => updateFilters(e)}
                      checked={filterOptions.underDev}
                    />
                    <label htmlFor="underDev">Under Development</label>
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Date Created</legend>
                  <div className="dates">
                    <input
                      type="checkbox"
                      id="pastWeek"
                      name="date-option"
                      value="pastWeek"
                      className="hidden"
                      onChange={(e) => updateFilters(e)}
                      checked={filterOptions.pastWeek}
                    />
                    <label htmlFor="pastWeek">Past Week</label>
                    <input
                      type="checkbox"
                      id="pastMonth"
                      name="date-option"
                      value="pastMonth"
                      className="hidden"
                      onChange={(e) => updateFilters(e)}
                      checked={filterOptions.pastMonth}
                    />
                    <label htmlFor="pastMonth">Past Month</label>
                    <input
                      type="checkbox"
                      id="pastYear"
                      name="date-option"
                      value="pastYear"
                      className="hidden"
                      onChange={(e) => updateFilters(e)}
                      checked={filterOptions.pastYear}
                    />
                    <label htmlFor="pastYear">Past Year</label>
                  </div>
                </fieldset>
                <div>
                  <input type="submit" value="Apply" />
                  <button onClick={clearFilters}>Reset</button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="search-bar-container">
          <div className="search-bar">
            <MagnifyingGlass />
            <label htmlFor="search" className="hidden">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search"
              onChange={handleSearchBarChange}
              onFocus={focusSearchBar}
              onBlur={handleOnBlur}
            />
            {isSearchBarActive && (
              <button onClick={clearSearchBar}>
                <XCircleFill />
              </button>
            )}
          </div>
          {isSearchBarFocused && (
            <button onClick={handleSearchCancel}>Cancel</button>
          )}
        </div>
      </div>

      <Outlet />
      <Link
        to="/submit-request"
        className="link-btn submit-request-link"
        state={{ prevLocation: location.pathname }}
      >
        Submit a Feature Request
      </Link>
    </div>
  );
}
