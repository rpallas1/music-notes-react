export default function truncate(string, maxLength) {
  if (string.length > maxLength) {
    return string.slice(0, maxLength).trim() + "...";
  }

  return string;
}
