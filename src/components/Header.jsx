import React from "react";
import { NavLink, Link, useLocation } from "react-router";
import classnames from "classnames";
import { Pencil } from "../icons";

/**
 * The Header component that displays the main navigation.
 */
export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navBtnRef = React.useRef(null);
  const homeLinkRef = React.useRef(null);

  /**
   * Toggle the menu open and closed.
   */
  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  /**
   * Get the classes for the link.
   *
   * @param {boolean} isActive - Whether the link is active. Defaults to false.
   * @returns {object} The classes for the link.
   */
  function linkClasses(isActive = false) {
    return classnames(isActive ? "active" : null);
  }

  /**
   * Closes the menu.
   *
   * @param {object} e - The event object.
   */
  function closeMenu(e) {
    e.target.blur();
    navBtnRef.current.checked = false;
    setIsMenuOpen(false);
  }

  /**
   * Handle the key press event used to select a menu option.
   *
   * @param {object} e - The event object.
   * @param {string} id - The ID of the menu option.
   */
  function handleKeyPress(e, id) {
    if (e.key === " ") {
      e.preventDefault();
      document.getElementById(id).click();
    }
  }

  /**
   * Handle the focus event used to open the menu.
   */
  function handleNavFocusCapture() {
    if (homeLinkRef.current === document.activeElement) {
      return;
    }

    navBtnRef.current.checked = true;
    setIsMenuOpen(true);
  }

  return (
    <>
      {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
      <header>
        <nav>
          <h2 className="sr-only">Main Navigation</h2>
          <input
            type="checkbox"
            id="nav-btn"
            onChange={toggleMenu}
            ref={navBtnRef}
          />
          <label
            htmlFor="nav-btn"
            tabIndex="0"
            onKeyDown={(e) => handleKeyPress(e, "nav-btn")}
          >
            <span className="sr-only">Menu Dropdown</span>
            <div className="hamburger-container">
              <div
                className={`hamburger top ${isMenuOpen ? "expanded" : ""}`}
              ></div>
              <div
                className={`hamburger middle ${isMenuOpen ? "expanded" : ""}`}
              ></div>
              <div
                className={`hamburger bottom ${isMenuOpen ? "expanded" : ""}`}
              ></div>
            </div>
          </label>
          <ul onFocusCapture={handleNavFocusCapture} onBlurCapture={closeMenu}>
            <li>
              <Link
                className="site-logo"
                to="/"
                onClick={closeMenu}
                ref={homeLinkRef}
              >
                <div className="logo-container">
                  <Pencil />
                </div>
                <h1>Music Notes</h1>
              </Link>
            </li>
            <li>
              <NavLink
                to="/"
                end
                className={() => (location.pathname === "/" ? "active" : null)}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="feature-requests"
                className={({ isActive }) => linkClasses(isActive)}
                onClick={closeMenu}
              >
                Feature Requests
              </NavLink>
            </li>
            <li>
              <NavLink
                to="contact"
                className={({ isActive }) => linkClasses(isActive)}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
            <li className="download-app disabled" inert={true}>
              <NavLink
                to="#"
                end
                className={({ isActive }) => linkClasses(isActive)}
                tabIndex="-1"
              >
                Download
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
