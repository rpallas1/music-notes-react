import React from "react";
import {
  LightbulbMaxFill,
  FlameFill,
  WrenchAndScrewdriverFill,
  CheckmarkSquare,
} from "../icons";

export default function Tag({ type, compact }) {
  let icon = null;

  switch (type) {
    case "new":
      icon = <LightbulbMaxFill />;
      break;
    case "trending":
      icon = <FlameFill />;
      break;
    case "under-dev":
      icon = <WrenchAndScrewdriverFill />;
      break;
    case "implemented":
      icon = <CheckmarkSquare />;
      break;
    default:
      console.error(`Recieved an invalid tag type: ${type}`);
      break;
  }

  return (
    <div className={`tag ${type} ${compact ? "compact" : ""}`}>
      {icon}
      <p>New</p>
    </div>
  );
}
