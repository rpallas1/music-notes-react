import React from "react";

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
