import React from "react";
import { NavLink, Link, useLocation } from "react-router";
import classnames from "classnames";
import { Pencil } from "../icons";

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navBtnRef = React.useRef(null);
  const homeLinkRef = React.useRef(null);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function linkClasses(isActive = false) {
    return classnames(isActive ? "active" : null);
  }

  function closeMenu(e) {
    e.target.blur();
    navBtnRef.current.checked = false;
    setIsMenuOpen(false);
  }

  function handleKeyPress(e, id) {
    if (e.key === " ") {
      e.preventDefault();
      document.getElementById(id).click();
    }
  }

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
