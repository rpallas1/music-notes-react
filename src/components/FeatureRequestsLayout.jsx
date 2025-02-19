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
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [areFilterApplied, setAreFilterApplied] = React.useState(false);
  const [isSearchBarActive, setIsSearchBarActive] = React.useState(false);
  const [isSearchBarFocused, setIsSearchBarFocused] = React.useState(false);

  function handleCheckboxChange(e) {
    const value = e.target.value;
    setFilterOptions((prev) => {
      return prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value];
    });
  }

  function handleKeyDown(e, id) {
    if (e.key === " ") {
      e.preventDefault();
      document.getElementById(id).click();
    }
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
    setFilterOptions([]);
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
    <section className="feature-requests-page">
      <h2>Feature Requests</h2>
      <p className="page-description">
        See a feature you like? Give it an upvote! Don&apos;t see a feature that
        Music Notes should have? Submit a Feature Request!
      </p>
      <div className="options-container">
        <div className="sort-options-container">
          <label className="sr-only" htmlFor="sort-options">
            Sort By
          </label>
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
                  <div className="tags options">
                    <input
                      type="checkbox"
                      id="trending"
                      name="tag-option"
                      value="trending"
                      tabIndex="-1"
                      className="sr-only"
                      onChange={handleCheckboxChange}
                      checked={filterOptions.includes("trending")}
                    />
                    <label
                      htmlFor="trending"
                      tabIndex="0"
                      onKeyDown={(e) => handleKeyDown(e, "trending")}
                    >
                      Trending
                    </label>
                    <input
                      type="checkbox"
                      id="new"
                      name="tag-option"
                      value="new"
                      tabIndex="-1"
                      className="sr-only"
                      onChange={handleCheckboxChange}
                      checked={filterOptions.includes("new")}
                    />
                    <label
                      htmlFor="new"
                      tabIndex="0"
                      onKeyDown={(e) => handleKeyDown(e, "new")}
                    >
                      New
                    </label>
                    <input
                      type="checkbox"
                      id="implemeted"
                      name="tag-option"
                      value="implemented"
                      tabIndex="-1"
                      className="sr-only"
                      onChange={handleCheckboxChange}
                      checked={filterOptions.includes("implemented")}
                    />
                    <label
                      htmlFor="implemeted"
                      tabIndex="0"
                      onKeyDown={(e) => handleKeyDown(e, "implemented")}
                    >
                      Implemented
                    </label>
                    <input
                      type="checkbox"
                      id="underDev"
                      name="tag-option"
                      value="underDev"
                      tabIndex="-1"
                      className="sr-only"
                      onChange={handleCheckboxChange}
                      checked={filterOptions.includes("underDev")}
                    />
                    <label
                      htmlFor="underDev"
                      tabIndex="0"
                      onKeyDown={(e) => handleKeyDown(e, "underDev")}
                    >
                      Under Development
                    </label>
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Date Created</legend>
                  <div className="dates options">
                    <input
                      type="checkbox"
                      id="pastWeek"
                      name="date-option"
                      value="pastWeek"
                      tabIndex="-1"
                      className="sr-only"
                      onChange={handleCheckboxChange}
                      checked={filterOptions.includes("pastWeek")}
                    />
                    <label
                      htmlFor="pastWeek"
                      tabIndex="0"
                      onKeyDown={(e) => handleKeyDown(e, "pastWeek")}
                    >
                      Past Week
                    </label>
                    <input
                      type="checkbox"
                      id="pastMonth"
                      name="date-option"
                      value="pastMonth"
                      tabIndex="-1"
                      className="sr-only"
                      onChange={handleCheckboxChange}
                      checked={filterOptions.includes("pastMonth")}
                    />
                    <label
                      htmlFor="pastMonth"
                      tabIndex="0"
                      onKeyDown={(e) => handleKeyDown(e, "pastMonth")}
                    >
                      Past Month
                    </label>
                    <input
                      type="checkbox"
                      id="pastYear"
                      name="date-option"
                      value="pastYear"
                      tabIndex="-1"
                      className="sr-only"
                      onChange={handleCheckboxChange}
                      checked={filterOptions.includes("pastYear")}
                    />
                    <label
                      htmlFor="pastYear"
                      tabIndex="0"
                      onKeyDown={(e) => handleKeyDown(e, "pastYear")}
                    >
                      Past Year
                    </label>
                  </div>
                </fieldset>
                <div>
                  <input type="submit" value="Apply" className="text-link" />
                  <button onClick={clearFilters} className="text-link">
                    Reset
                  </button>
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
              <button onClick={clearSearchBar} className="close-btn">
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
    </section>
  );
}
