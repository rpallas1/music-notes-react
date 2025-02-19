import React from "react";
import { NavLink, Link, useLocation } from "react-router";
import classnames from "classnames";
import { Pencil, Line3Horizontal, XMark } from "../icons";

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function linkClasses(isActive = false) {
    return classnames(isActive ? "active" : null);
  }

  function closeMenu(e) {
    e.target.blur();
    document.getElementById("nav-btn").checked = false;
    setIsMenuOpen(false);
  }

  function handleKeyPress(e, id) {
    if (e.key === " ") {
      e.preventDefault();
      document.getElementById(id).click();
    }
  }

  return (
    <>
      {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
      <header>
        <nav>
          <h2 className="sr-only">Main Navigation</h2>
          <input type="checkbox" id="nav-btn" onChange={toggleMenu} />
          <label
            htmlFor="nav-btn"
            tabIndex="0"
            onKeyDown={(e) => handleKeyPress(e, "nav-btn")}
          >
            <span className="sr-only">Menu Dropdown</span>
            {isMenuOpen ? <XMark /> : <Line3Horizontal />}
          </label>
          <ul>
            <li>
              <Link className="site-logo" to="/" onClick={closeMenu}>
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
            <li className="download-app disabled">
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
