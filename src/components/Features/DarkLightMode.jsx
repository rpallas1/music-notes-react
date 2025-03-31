import React from "react";
import { ArrowLeftArrowRight } from "../../icons";

export default function DarkLightMode() {
  const [isDragging, setIsDragging] = React.useState(false);
  const [offsetX, setOffsetX] = React.useState(0);
  const themeContainerRef = React.useRef(null);
  const sliderRef = React.useRef(null);
  const darkModeRef = React.useRef(null);

  React.useEffect(() => {
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("touchend", stopDragging);
    window.addEventListener("touchmove", updatePosition);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("touchend", stopDragging);
      window.removeEventListener("touchmove", updatePosition);
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleResize = () => {
    const containerWidth = parseFloat(
      themeContainerRef.current.getBoundingClientRect().width,
    ).toFixed(2);
    const darkModeWidth = parseFloat(
      darkModeRef.current.getBoundingClientRect().width,
    ).toFixed(2);

    if (darkModeWidth > containerWidth * 0.9) {
      console.log("resizing");
      darkModeRef.current.style.width = `${containerWidth - 10}px`;
      sliderRef.current.style.left = `${containerWidth - 10}px`;
    }
  };

  const updatePosition = (e) => {
    if (!isDragging) return;

    const cX = e.clientX || e.touches[0].clientX || 0;
    const padding = 10;
    const maxX = parseFloat(
      themeContainerRef.current.getBoundingClientRect().width - padding,
    ).toFixed(2);
    let newX = parseFloat(
      cX - themeContainerRef.current.getBoundingClientRect().left - offsetX,
    ).toFixed(2);

    if (Math.round(newX) <= padding) {
      newX = padding;
    } else if (Math.round(newX) >= Math.round(maxX)) {
      newX = maxX;
    }

    sliderRef.current.style.left = `${newX}px`;
    darkModeRef.current.style.width = `${newX}px`;
  };

  const stopDragging = () => {
    setIsDragging(false);
    sliderRef.current.style.animationPlayState = "running";
    sliderRef.current.children[0].style.animationPlayState = "running";
  };

  const startDragging = (e) => {
    e.preventDefault();
    setIsDragging(true);

    const cX = e.clientX || e.touches[0].clientX || 0;

    setOffsetX(cX - sliderRef.current.getBoundingClientRect().left);
    sliderRef.current.style.animationPlayState = "paused";
    sliderRef.current.children[0].style.animationPlayState = "paused";
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
          onMouseDownCapture={startDragging}
          onTouchStartCapture={startDragging}
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
