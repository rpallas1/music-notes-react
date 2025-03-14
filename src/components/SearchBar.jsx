import React from "react";
import { useSearchParams } from "react-router";
import { MagnifyingGlass, XCircleFill } from "../icons";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(
    searchParams.get("search") || "",
  );
  const [isSearchBarActive, setIsSearchBarActive] = React.useState(false);
  const [isSearchBarFocused, setIsSearchBarFocused] =
    React.useState(searchQuery);
  const searchBarRef = React.useRef(null);

  React.useEffect(() => {
    setSearchQueryParams(searchQuery);
  }, [searchQuery]);

  function clearSearchBar() {
    setIsSearchBarActive(false);
    searchBarRef.current.focus();
    setSearchQuery("");
    setSearchParams((prevParams) => {
      prevParams.delete("search");
      return prevParams;
    });
  }

  function handleSearchBarChange(e) {
    const value = e.target.value;

    if (value) {
      setIsSearchBarActive(true);
    } else {
      setIsSearchBarActive(false);
    }

    setSearchQuery(value);
  }

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

  function handleSearchCancel() {
    clearSearchBar();
    setIsSearchBarActive(false);
    setIsSearchBarFocused(false);
    searchBarRef.current.blur();
  }

  function handleOnBlur() {
    if (searchBarRef.current.value === "") {
      setIsSearchBarFocused(false);
    }
  }

  function handleFocusSearchBar() {
    searchBarRef.current.focus();
    setIsSearchBarFocused(true);

    if (searchQuery) {
      setIsSearchBarActive(true);
    }
  }

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
