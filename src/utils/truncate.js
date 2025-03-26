/**
 * Truncate a string to a maximum length.
 *
 * @param {string} string - The string to truncate.
 * @param {number} maxLength - The maximum length of the string.
 * @returns {string} The truncated string.
 */
export default function truncate(string, maxLength) {
  if (string.length > maxLength) {
    return string.slice(0, maxLength).trim() + "...";
  }

  return string;
}
