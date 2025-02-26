import React from "react";
import { useSearchParams } from "react-router";
import useOverlay from "../hooks/useOverlay";
import { Line3HorizontalDecrease } from "../icons";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tagOptions, setTagOptions] = React.useState(
    searchParams.get("tag")?.split(",") || [],
  );
  const [dateOption, setDateOption] = React.useState(
    searchParams.get("date") || null,
  );
  const areFilterApplied = searchParams.has("tag") || searchParams.has("date");
  const {
    isOpen: showFilters,
    ref,
    handleToggle: toggleFilterVisibility,
  } = useOverlay();

  function handleCheckboxChange(e, key) {
    const value = e.target.value;

    if (key === "tag") {
      setTagOptions((prev) => {
        return prev.includes(value)
          ? prev.filter((option) => option !== value)
          : [...prev, value];
      });
    }

    if (key === "date") {
      if (dateOption === value) {
        setDateOption(null);
        return;
      }

      setDateOption(value);
    }
  }

  function handleKeyDown(e, id) {
    if (e.key === " ") {
      e.preventDefault();
      document.getElementById(id).click();
    }
  }

  function applyFilters(e) {
    e.preventDefault();
    toggleFilterVisibility();

    setSearchParams((prevParams) => {
      if (tagOptions.length === 0) {
        prevParams.delete("tag");
      } else {
        prevParams.set(
          "tag",
          tagOptions.map((option) => encodeURI(option)).join(","),
        );
      }

      if (!dateOption) {
        prevParams.delete("date");
      } else {
        prevParams.set("date", dateOption);
        prevParams.set("current-date", new Date().getTime());
      }

      return prevParams;
    });
  }

  function clearFilters(e) {
    e.preventDefault();

    const filterOptionsForm = document.getElementById("filter-options-form");
    filterOptionsForm.reset();

    setTagOptions([]);
    setDateOption(null);

    setSearchParams((prevParams) => {
      prevParams.delete("tag");
      prevParams.delete("date");
      prevParams.delete("current-date");

      return prevParams;
    });
  }

  return (
    <div className="filter-options-container">
      <button
        className={`filter-options-btn options-btn ${showFilters ? "dimmed" : ""} ${!areFilterApplied ? "inactive" : ""}`}
        onClick={toggleFilterVisibility}
      >
        Filters <Line3HorizontalDecrease />
      </button>
      {showFilters && (
        <>
          <div className="overlay" onClick={toggleFilterVisibility}></div>
          <div
            className="filter-options overlay-content"
            ref={ref}
            aria-hidden={!showFilters}
            aria-labelledby="filterOptionsTitle"
          >
            <h3 id="filterOptionsTitle" className="sr-only">
              Filter Options
            </h3>
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
                    onChange={(e) => handleCheckboxChange(e, "tag")}
                    checked={tagOptions.includes("trending")}
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
                    onChange={(e) => handleCheckboxChange(e, "tag")}
                    checked={tagOptions.includes("new")}
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
                    onChange={(e) => handleCheckboxChange(e, "tag")}
                    checked={tagOptions.includes("implemented")}
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
                    id="under-dev"
                    name="tag-option"
                    value="under-dev"
                    tabIndex="-1"
                    className="sr-only"
                    onChange={(e) => handleCheckboxChange(e, "tag")}
                    checked={tagOptions.includes("under-dev")}
                  />
                  <label
                    htmlFor="under-dev"
                    tabIndex="0"
                    onKeyDown={(e) => handleKeyDown(e, "under-dev")}
                  >
                    Under Development
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <legend>Date Created</legend>
                <div className="dates options">
                  {/* TODO: Change date options to radio buttons and adjust styling */}
                  <input
                    type="checkbox"
                    id="past-week"
                    name="date-option"
                    value="past-week"
                    tabIndex="-1"
                    className="sr-only"
                    onChange={(e) => handleCheckboxChange(e, "date")}
                    checked={dateOption === "past-week"}
                  />
                  <label
                    htmlFor="past-week"
                    tabIndex="0"
                    onKeyDown={(e) => handleKeyDown(e, "past-week")}
                  >
                    Past Week
                  </label>
                  <input
                    type="checkbox"
                    id="past-month"
                    name="date-option"
                    value="past-month"
                    tabIndex="-1"
                    className="sr-only"
                    onChange={(e) => handleCheckboxChange(e, "date")}
                    checked={dateOption === "past-month"}
                  />
                  <label
                    htmlFor="past-month"
                    tabIndex="0"
                    onKeyDown={(e) => handleKeyDown(e, "past-month")}
                  >
                    Past Month
                  </label>
                  <input
                    type="checkbox"
                    id="past-year"
                    name="date-option"
                    value="past-year"
                    tabIndex="-1"
                    className="sr-only"
                    onChange={(e) => handleCheckboxChange(e, "date")}
                    checked={dateOption === "past-year"}
                  />
                  <label
                    htmlFor="past-year"
                    tabIndex="0"
                    onKeyDown={(e) => handleKeyDown(e, "past-year")}
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
        </>
      )}
    </div>
  );
}
