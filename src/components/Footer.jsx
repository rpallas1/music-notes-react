import React from "react";
import { Link } from "react-router";
import { DesktopComputer, SunMaxFill, MoonFill } from "../icons";
import useThemeDetector from "../hooks/useThemeDetector";

/**
 * The footer component that displays the privacy policy link and the color scheme options.
 */
export default function Footer() {
  const isDarkTheme = useThemeDetector();
  const [storedPreference, setStoredPreference] = React.useState(
    localStorage.getItem("color-scheme-preference") || "device",
  );

  document.body.classList = "";
  document.body.classList.add(getColorScheme(storedPreference));

  /**
   * Handle the color scheme change event.
   *
   * @param {object} e - The event object.
   */
  function handleColorSchemeChange(e) {
    const body = document.body;
    const preference = e.target.value;
    const theme = getColorScheme(preference);

    localStorage.setItem("color-scheme-preference", preference);
    setStoredPreference(preference);

    body.classList = "";
    body.classList.add(theme);
  }

  /**
   * Handle the key down event used to select a color scheme option.
   *
   * @param {object} e - The event object.
   * @param {string} id - The ID of the color scheme option.
   */
  function handleKeyDown(e, id) {
    if (e.key === " ") {
      e.preventDefault();
      document.getElementById(id).click();
    }
  }

  /**
   * Get the color scheme based on the user preference.
   *
   * @param {string} preference - The user preference.
   * @returns {string} The color scheme.
   */
  function getColorScheme(preference) {
    if (!preference || preference === "device") {
      return isDarkTheme ? "dark" : "light";
    }

    return preference;
  }

  return (
    <footer>
      <Link to="privacy-policy" className="text-link">
        Privacy Policy
      </Link>
      <small>&copy; 2025 Pallas Creations</small>
      <fieldset className="color-scheme-options">
        <legend className="sr-only">Color Scheme Options</legend>
        <input
          type="radio"
          id="device-color-scheme"
          name="color-scheme"
          value="device"
          checked={storedPreference === "device"}
          onChange={handleColorSchemeChange}
        />
        <label
          htmlFor="device-color-scheme"
          tabIndex="0"
          onKeyDown={(e) => handleKeyDown(e, "device-color-scheme")}
        >
          <span className="sr-only">Device Color Scheme</span>
          <DesktopComputer />
        </label>
        <input
          type="radio"
          id="dark-color-scheme"
          name="color-scheme"
          value="dark"
          checked={storedPreference === "dark"}
          onChange={handleColorSchemeChange}
        />
        <label
          htmlFor="dark-color-scheme"
          tabIndex="0"
          onKeyDown={(e) => handleKeyDown(e, "dark-color-scheme")}
        >
          <span className="sr-only">Dark Color Scheme</span>
          <MoonFill />
        </label>
        <input
          type="radio"
          id="light-color-scheme"
          name="color-scheme"
          value="light"
          checked={storedPreference === "light"}
          onChange={handleColorSchemeChange}
        />
        <label
          htmlFor="light-color-scheme"
          tabIndex="0"
          onKeyDown={(e) => handleKeyDown(e, "light-color-scheme")}
        >
          <span className="sr-only">Light Color Scheme</span>
          <SunMaxFill />
        </label>
      </fieldset>
    </footer>
  );
}
