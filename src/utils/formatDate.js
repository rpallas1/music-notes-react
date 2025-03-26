/**
 * Formats a date object into a string
 *
 * @param {Date} date - The date object to format
 * @returns {string} The formatted date string
 */
export default function formatDate(date) {
  date = new Date(date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
}
