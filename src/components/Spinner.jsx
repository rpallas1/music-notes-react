import React from "react";
import { Spinner as JSSpinner } from "spin.js";
import useDelayedRender from "../hooks/useDelayedRender";

export default function Spinner({ delay }) {
  const spinnerContainerRef = React.useRef(null);
  const delayedRender = useDelayedRender(delay);

  React.useEffect(() => {
    var opts = {
      lines: 8, // The number of lines to draw
      length: 28, // The length of each line
      width: 16, // The line thickness
      radius: 25, // The radius of the inner circle
      scale: 0.2, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      speed: 1, // Rounds per second
      rotate: 0, // The rotation offset
      animation: "spinner-line-fade-default", // The CSS animation name for the lines
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: ["#f2f2f7, #1c1c1e"], // CSS color or array of colors
      fadeColor: "transparent", // CSS color or array of colors
      top: "50%", // Top position relative to parent
      left: "50%", // Left position relative to parent
      shadow: "0 0 1px transparent", // Box-shadow for the lines
      zIndex: 250, // The z-index (defaults to 2e9)
      className: "spinner", // The CSS class to assign to the spinner
      position: "absolute", // Element positioning
    };

    const spinner = new JSSpinner(opts).spin(spinnerContainerRef.current);

    return () => {
      spinner.stop();
    };
  }, [delayedRender]);

  return delayedRender(() => (
    <div className="spinner-wrapper">
      <div className="spinner-container" ref={spinnerContainerRef}></div>
      <p className="message loading">Loading</p>
    </div>
  ));
}
