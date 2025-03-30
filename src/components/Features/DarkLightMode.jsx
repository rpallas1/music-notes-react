import React from "react";
import { ArrowLeftArrowRight } from "../../icons";

export default function DarkLightMode() {
  const [isDragging, setIsDragging] = React.useState(false);
  const [offsetX, setOffsetX] = React.useState(0);
  const themeContainerRef = React.useRef(null);
  const sliderRef = React.useRef(null);
  const darkModeRef = React.useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffsetX(e.clientX - sliderRef.current.getBoundingClientRect().left);
    sliderRef.current.style.animationPlayState = "paused";
    sliderRef.current.children[0].style.animationPlayState = "paused";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) {
      return;
    }

    const padding = 10;
    const maxX = parseFloat(
      themeContainerRef.current.getBoundingClientRect().right - padding,
    ).toFixed(2);
    let newX = parseFloat(
      e.clientX -
        offsetX -
        themeContainerRef.current.getBoundingClientRect().left,
    ).toFixed(2);

    if (Math.round(newX) <= padding) {
      newX = padding;
    } else if (Math.round(newX) >= Math.round(maxX)) {
      newX = maxX;
    }

    sliderRef.current.style.left = `${newX}px`;
    darkModeRef.current.style.width = `${newX}px`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    sliderRef.current.style.animationPlayState = "running";
    sliderRef.current.children[0].style.animationPlayState = "running";
  };

  return (
    <section className="feature-container dark-light-mode">
      <h3>Light and Dark Mode</h3>
      <div className="asset-container" ref={themeContainerRef}>
        <div className="crop">
          <img
            className="light-mode"
            src="/images/light-mode-1.jpg"
            alt=""
            width={320}
            height={651.95}
          />
        </div>
        <button
          className="theme-slider"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onDragStart={(e) => e.preventDefault()}
          ref={sliderRef}
        >
          <div className="btn-bg"></div>
          <ArrowLeftArrowRight />
          <span className="sr-only">Drag</span>
        </button>
        <div className="crop" ref={darkModeRef}>
          <img
            className="dark-mode"
            src="/images/dark-mode-1.jpg"
            alt=""
            width={320}
            height={651.95}
          />
        </div>
      </div>
    </section>
  );
}
