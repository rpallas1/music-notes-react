import { Link } from "react-router";

export default function CancelLink({ prevLocation }) {
  return (
    <Link to={prevLocation || ".."} className="mobile-only text-link">
      Cancel
    </Link>
  );
}
