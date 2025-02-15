import { Link } from "react-router";
import { XCircleFill } from "../icons";

export default function CloseModelLink({ prevLocation }) {
  <Link to={prevLocation || ".."} className="close-modal">
    <XCircleFill className="not-mobile" />
  </Link>;
}
