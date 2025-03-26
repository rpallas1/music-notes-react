/**
 * Find the error message for a specific input field
 *
 * @param {Object} errors - Object containing all form errors
 * @param {string} name - Name of the input field
 * @returns {Object} - Object containing the error message for the input field
 */
export default function findInputError(errors, name) {
  const filtered = Object.keys(errors)
    .filter((key) => key.includes(name))
    .reduce((obj, key) => {
      return Object.assign(obj, { error: errors[key] });
    }, {});

  return filtered;
}
