import React from "react";
import { useSearchParams } from "react-router";
import { ArrowUpArrowDown, ChevronUp, ChevronDown } from "../icons";

export default function SortDropdown() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDescending, setIsDescending] = React.useState(true);
  const [sortOption, setSortOption] = React.useState(
    searchParams.get("sort") || "date-created",
  );

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

  function toggleSortOrder() {
    setIsDescending((prev) => !prev);

    setSearchParams((prevParams) => {
      if (!isDescending) {
        prevParams.delete("isDescending");

        return prevParams;
      }

      prevParams.set("isDescending", "true");

      return prevParams;
    });
  }

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
        <input
          type="checkbox"
          id="sort-order"
          className="sr-only"
          tabIndex="-1"
          checked={isDescending}
          onChange={toggleSortOrder}
        />
        <label htmlFor="sort-order" tabIndex="0" onKeyDown={handleKeyDown}>
          {isDescending ? <ChevronUp /> : <ChevronDown />}
        </label>
      </div>
    </div>
  );
}
