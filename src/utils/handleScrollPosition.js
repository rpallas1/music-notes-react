export function saveScrollY() {
  const scrollPosition = window.scrollY;
  localStorage.setItem("scrollY", scrollPosition);
}

export function getScrollY() {
  return localStorage.getItem("scrollY");
}

export function removeScrollY() {
  localStorage.removeItem("scrollY");
}
