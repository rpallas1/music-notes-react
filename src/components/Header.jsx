import React from "react";
import { NavLink, Link, useLocation } from "react-router";
import classnames from "classnames";
import { Pencil } from "../icons";

export default function Header() {
  function linkClasses(isActive = false) {
    return classnames(isActive ? "active" : null);
  }

  const location = useLocation();
  // Close navigation menu when a link is clicked
  function closeMenu() {
    document.getElementById("nav-btn").checked = false;
  }

  return (
    <>
      <a id="skip-link" href="#main-content">
        Skip to Main Content
      </a>

      <header>
        <Link className="site-logo" to="/" onClick={closeMenu}>
          <div className="logo-container">
            <Pencil />
          </div>
          <h1>Music Notes</h1>
        </Link>
        <nav>
          <h2 className="sr-only">Main Navigation</h2>
          <input type="checkbox" id="nav-btn" />
          <label htmlFor="nav-btn">
            <span className="sr-only">Menu Dropdown</span>|||
          </label>
          <ul>
            <div>
              <li>
                <NavLink
                  to="/"
                  end
                  className={() =>
                    location.pathname === "/" ? "active" : null
                  }
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
            </div>
            <li className="download-app disabled">
              <NavLink
                to="#"
                end
                className={({ isActive }) => linkClasses(isActive)}
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
