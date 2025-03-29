import { Link, useNavigate } from "react-router";
import classNames from "classnames";
import { ChevronBackward } from "../icons";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

/**
 * A component that renders a navigation link. Used to navigate back one in the history stack.
 *
 * @param {object} props - The component props.
 * @param {string} props.type - The type of navigation link. Defaults to "back".
 * @param {function} props.onNav - The callback function to run on navigation. Defaults to an empty function.
 */
export default function BackLink({ type = "back", onBack = () => {} }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
    onBack();
  };
  const linkClasses = classNames("text-link", {
    "back-link": type === "back",
  });

  return (
    <Link className={linkClasses} onClick={handleClick}>
      {type === "back" && <ChevronBackward />}
      {capitalizeFirstLetter(type)}
    </Link>
  );
}
