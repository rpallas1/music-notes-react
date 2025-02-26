import { Link } from "react-router";

export default function CancelLink({
  prevLocation,
  prevSearchParams,
  onCancel = () => {},
}) {
  return (
    <Link
      to={{ pathname: prevLocation || "..", search: prevSearchParams }}
      className="mobile-only text-link"
      onClick={onCancel}
    >
      Cancel
    </Link>
  );
}
