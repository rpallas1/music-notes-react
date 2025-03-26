/**
 * Format a number to a human-readable string.
 *
 * @param {number} number - The number to format.
 * @returns {string} The formatted number
 */
export default function formatNumber(number) {
  const absNumber = Math.abs(number);

  if (absNumber > 1000000) {
    return (number / 1000000).toFixed(1) + "m";
  } else if (absNumber > 1000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return number;
  }
}
