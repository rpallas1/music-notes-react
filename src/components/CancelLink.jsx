import { Link } from "react-router";

/**
 * A cancel link that navigates to the previous location.
 *
 * @param {object} props - The component props.
 * @param {string} props.prevLocation - The previous location.
 * @param {string} props.prevSearchParams - The previous search params.
 * @param {function} props.onCancel - The callback function to call when the cancel link is clicked. Defaults to an empty function.
 */
export default function CancelLink({
  prevLocation,
  prevSearchParams,
  onCancel = () => {},
}) {
  return (
    <Link
      to={{ pathname: prevLocation || "..", search: prevSearchParams }}
      className="text-link"
      onClick={onCancel}
    >
      Cancel
    </Link>
  );
}
