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

  React.useEffect(() => {
    setSearchQueryParams(searchQuery);
  }, [searchQuery]);

  // React.useEffect(() => {
  //   localStorage.setItem("searchParams", new URLSearchParams(searchParams));
  // }, [searchParams]);

  function clearSearchBar() {
    setIsSearchBarActive(false);
    focusSearchBar();
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

    if (searchQuery) {
      setIsSearchBarActive(true);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      setIsSearchBarActive(false);
      document.getElementById("search").blur();
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
          onFocus={focusSearchBar}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyPress}
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
  );
}
