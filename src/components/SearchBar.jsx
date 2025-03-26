import React from "react";
import { useSearchParams } from "react-router";
import { MagnifyingGlass, XCircleFill } from "../icons";

/**
 * A search bar that allows users to search for content.
 */
export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(
    searchParams.get("search") || "",
  );
  const [isSearchBarActive, setIsSearchBarActive] = React.useState(false);
  const [isSearchBarFocused, setIsSearchBarFocused] =
    React.useState(searchQuery);
  const searchBarRef = React.useRef(null);

  // Update the search query params when the search query changes
  React.useEffect(() => {
    setSearchQueryParams(searchQuery);
  }, [searchQuery]);

  /**
   * Clears the search bar and search query.
   */
  function clearSearchBar() {
    setIsSearchBarActive(false);
    searchBarRef.current.focus();
    setSearchQuery("");
    setSearchParams((prevParams) => {
      prevParams.delete("search");
      return prevParams;
    });
  }

  /**
   * Handle the search bar change event.
   *
   * @param {object} e - The event object
   */
  function handleSearchBarChange(e) {
    const value = e.target.value;

    if (value) {
      setIsSearchBarActive(true);
    } else {
      setIsSearchBarActive(false);
    }

    setSearchQuery(value);
  }

  /**
   * Set the search query params.
   *
   * @param {string} query - The search query.
   */
  function setSearchQueryParams(query) {
    setSearchParams((prevParams) => {
      if (!query) {
        prevParams.delete("search");
      } else {
        prevParams.set("search", query);
      }

      return prevParams;
    });
  }

  /**
   * Handle the search cancel event.
   */
  function handleSearchCancel() {
    clearSearchBar();
    setIsSearchBarActive(false);
    setIsSearchBarFocused(false);
    searchBarRef.current.blur();
  }

  /**
   * Handle the blur search bar event.
   */
  function handleOnBlur() {
    if (searchBarRef.current.value === "") {
      setIsSearchBarFocused(false);
    }
  }

  /**
   * Handle the focus search bar event.
   */
  function handleFocusSearchBar() {
    searchBarRef.current.focus();
    setIsSearchBarFocused(true);

    if (searchQuery) {
      setIsSearchBarActive(true);
    }
  }

  /**
   * Handle the key press event.
   */
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      setIsSearchBarActive(false);
      searchBarRef.current.blur();
    } else if (e.key === "Escape") {
      handleSearchCancel();
    }
  }

  return (
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
          value={searchQuery}
          onChange={handleSearchBarChange}
          onFocus={handleFocusSearchBar}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyPress}
          ref={searchBarRef}
        />
        {isSearchBarActive && searchQuery && (
          <button onClick={clearSearchBar} className="close-btn">
            <XCircleFill />
          </button>
        )}
      </div>
      {isSearchBarFocused && (
        <button onClick={handleSearchCancel}>Cancel</button>
      )}
    </div>
  );
}
