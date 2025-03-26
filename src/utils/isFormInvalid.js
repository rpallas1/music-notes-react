/**
 * Check if the form is invalid
 *
 * @param {Object} error - The error object
 * @returns {boolean} Whether the form is invalid
 */
export default function isFormInvalid(error) {
  if (Object.keys(error).length > 0) {
    return true;
  }

  return false;
}
