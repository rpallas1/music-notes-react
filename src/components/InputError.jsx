/**
 * The InputError component displays an error message for an input field.
 *
 * @param {object} props - The component props.
 * @param {string} props.message - The error message to display.
 */
export default function InputError({ message }) {
  return <p className="error-message">{message}</p>;
}
