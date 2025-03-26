import React from "react";
import { useSearchParams, createSearchParams } from "react-router";
import { ArrowUpArrowDown, ChevronUp, ChevronDown } from "../icons";

/**
 * A dropdown to sort the list feature requests.
 */
export default function SortDropdown() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDescending, setIsDescending] = React.useState(false);
  const [sortOption, setSortOption] = React.useState(
    searchParams.get("sort") || "date-created",
  );

  /**
   * Handle the sort change event.
   *
   * @param {object} e - The event object.
   */
  function handleSortChange(e) {
    const value = e.target.value;

    setSortOption(value);

    setSearchParams((prevParams) => {
      if (value === "date-created") {
        prevParams.delete("sort");

        return prevParams;
      }

      prevParams.set("sort", value);

      return prevParams;
    });
  }

  /**
   * Toggle the sort order.
   */
  function toggleSortOrder() {
    setIsDescending((prev) => !prev);

    setSearchParams((prevParams) => {
      if (isDescending) {
        prevParams.delete("isDescending");

        return prevParams;
      }

      prevParams.set("isDescending", "true");

      return prevParams;
    });
  }

  /**
   * Handle the key down event used to toggle the sort order.
   *
   * @param {object} e - The event object
   */
  function handleKeyDown(e) {
    if (e.key === " ") {
      toggleSortOrder();
    }
  }

  return (
    <div className="sort-options-container">
      <label className="sr-only" htmlFor="sort-options">
        Sort By
      </label>
      <ArrowUpArrowDown />
      <select
        name="sort-options"
        id="sort-options"
        className="options-btn"
        onChange={handleSortChange}
        defaultValue={sortOption}
      >
        <option value="date-created">Date Created</option>
        <option value="upvotes">Upvotes</option>
      </select>
      <div className="sort-order-checkbox">
        <label htmlFor="sort-direction" tabIndex="0" onKeyDown={handleKeyDown}>
          <>
            {isDescending ? <ChevronUp /> : <ChevronDown />}
            <span className="sr-only">
              Sort Order: {isDescending ? "Ascending" : "Descending"}
            </span>
          </>
        </label>
        <input
          type="checkbox"
          name="sort-direction"
          id="sort-direction"
          className="sr-only"
          tabIndex="-1"
          checked={isDescending}
          onChange={toggleSortOrder}
        />
      </div>
    </div>
  );
}
