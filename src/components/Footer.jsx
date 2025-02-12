import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer>
      <Link to="privacy-policy">Privacy Policy</Link>
      <small>&copy; 2025 Pallas Creations</small>
      <div>
        <button>Default</button>
        <button>Dark</button>
        <button>Light</button>
      </div>
    </footer>
  );
}
