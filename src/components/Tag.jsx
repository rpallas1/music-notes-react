import React from "react";
import {
  LightbulbMaxFill,
  FlameFill,
  WrenchAndScrewdriverFill,
  CheckmarkSquare,
} from "../icons";

/**
 * A tag component that displays a tag with an icon and text.
 *
 * @param {object} props - The component props.
 * @param {string} props.tag - The tag to display.
 * @param {boolean} props.compact - Whether to display the tag in compact mode.
 */
export default function Tag({ tag, compact }) {
  if (!tag) {
    return;
  }

  let icon = null;
  let tagName = null;

  switch (tag) {
    case "new":
      icon = <LightbulbMaxFill />;
      tagName = "New";
      break;
    case "trending":
      icon = <FlameFill />;
      tagName = "Trending";
      break;
    case "under-dev":
      icon = <WrenchAndScrewdriverFill />;
      tagName = "Under Development";
      break;
    case "implemented":
      icon = <CheckmarkSquare />;
      tagName = "Implemented";
      break;
    default:
      break;
  }

  return (
    <>
      {icon && (
        <div className={`tag ${tag} ${compact ? "compact" : ""}`}>
          {icon}
          <p>{tagName}</p>
        </div>
      )}
    </>
  );
}
