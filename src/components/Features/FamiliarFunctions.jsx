import React from "react";
import {
  AddToQueue,
  FolderFill,
  PinFill,
  PlayPauseFill,
  StarFill,
} from "../../icons";

export default function FamiliarFunctions() {
  const NUM_ICONS = 5;
  const [iconPositions, setIconPositions] = React.useState([
    "center",
    "right",
    "right-outer",
    "left-outer",
    "left",
  ]);
  const [centerIconPosition, setCenterIconPosition] = React.useState(0);
  const familiarFunctionsRef = React.useRef(null);

  React.useEffect(() => {
    setIconPositions((prev) => {
      const newIconPositions = [...prev];

      newIconPositions[centerIconPosition] = "center";
      newIconPositions[(centerIconPosition + 1) % NUM_ICONS] = "right";
      newIconPositions[(centerIconPosition + 2) % NUM_ICONS] = "right-outer";
      newIconPositions[(centerIconPosition + 3) % NUM_ICONS] = "left-outer";
      newIconPositions[(centerIconPosition + 4) % NUM_ICONS] = "left";

      return newIconPositions;
    });
  }, [centerIconPosition]);

  const handleFamiliarFunctionsRef = () => {
    const currentTime = familiarFunctionsRef.current.currentTime;

    /*
     * Frame rate: 32.17fps
     * 1: 0 to 2s 23 frames
     * 2: 2s 23 frames to 5s 30 frames
     * 3: 5s 30 frames to 9s 4 frames
     * 4: 9s 4 frames to 12s 9 frames
     * 5: 12s 9 frames to duration
     */
    if (currentTime < 2.766) {
      setCenterIconPosition(0);
    } else if (currentTime < 5.966) {
      setCenterIconPosition(1);
    } else if (currentTime < 9.133) {
      setCenterIconPosition(2);
    } else if (currentTime < 12.3) {
      setCenterIconPosition(3);
    } else {
      setCenterIconPosition(4);
    }
  };

  return (
    <section className="feature-container familiar-functions">
      <h3>Familar Functionality</h3>
      <div className="asset-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          controls
          width={320}
          height={652.25}
          ref={familiarFunctionsRef}
          onTimeUpdate={handleFamiliarFunctionsRef}
        >
          <source
            media="(min-width: 1200px)"
            src="/videos/familiar-functions-900.mp4"
            type="video/mp4"
          />
          <source
            media="(min-width: 1200px)"
            src="/videos/familiar-functions-900.webm"
            type="video/webm"
          />
          <source
            media="(min-width: 880px)"
            src="/videos/familiar-functions-600.mp4"
            type="video/mp4"
          />
          <source
            media="(min-width: 880px)"
            src="/videos/familiar-functions-600.webm"
            type="video/webm"
          />
          <source
            media="(max-width: 799px)"
            src="/videos/familiar-functions-300.mp4"
            type="video/mp4"
          />
          <source
            media="(max-width: 799px)"
            src="/videos/familiar-functions-300.webm"
            type="video/webm"
          />
          {/* <source src="/videos/familiar-functions-3.mp4" type="video/mp4" /> */}
        </video>
      </div>
      <div className="carousel-container">
        <ul className="familiar-functions-list">
          <li className={iconPositions[0] ?? ""}>
            <p>Favorite</p>
            <StarFill />
          </li>
          <li className={iconPositions[1] ?? ""}>
            <p>Pin</p>
            <PinFill />
          </li>
          <li className={iconPositions[2] ?? ""}>
            <p>Add to Queue</p>
            <AddToQueue />
          </li>
          <li className={iconPositions[3] ?? ""}>
            <p>Playback Controls</p>
            <PlayPauseFill />
          </li>
          <li className={iconPositions[4] ?? ""}>
            <p>Folders</p>
            <FolderFill />
          </li>
        </ul>
      </div>
    </section>
  );
}
