import React from "react";
import { NavLink, Link } from "react-router";

export default function Header() {
  return (
    <header>
      <h2 className="sr-only">Main Navigation</h2>
      <Link className="site-logo" to="/">
        Music Notes
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : null)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="feature-requests"
              className={({ isActive }) => (isActive ? "active" : null)}
            >
              Feature Request
            </NavLink>
          </li>
          <li>
            <NavLink
              to="contact"
              className={({ isActive }) => (isActive ? "active" : null)}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="download-app">
        <p>Download</p>
      </div>
    </header>
  );
}
