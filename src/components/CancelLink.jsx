import { Link } from "react-router";

export default function CancelLink({ prevLocation, prevSearchParams }) {
  return (
    <Link
      to={{ pathname: prevLocation || "..", search: prevSearchParams }}
      className="mobile-only text-link"
    >
      Cancel
    </Link>
  );
}
