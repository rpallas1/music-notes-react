import React from "react";
import { useSearchParams } from "react-router";

export default function SortDropdown() {
  const [searchParams, setSearchParams] = useSearchParams();
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

  return (
    <div className="sort-options-container">
      <label className="sr-only" htmlFor="sort-options">
        Sort By
      </label>
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
    </div>
  );
}
