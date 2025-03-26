import React from "react";

/**
 * Hook to detect the current theme.
 *
 * @returns {boolean} A boolean indicating if the current theme is dark. True if dark, false if light.
 */
export default function useThemeDetector() {
  const getCurrentTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkTheme, setIsDarkTheme] = React.useState(getCurrentTheme());
  const handleThemeChange = (e) => setIsDarkTheme(e.matches);

  React.useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    darkThemeMq.addEventListener("change", handleThemeChange);

    return () => darkThemeMq.removeEventListener("change", handleThemeChange);
  }, []);

  return isDarkTheme;
}
