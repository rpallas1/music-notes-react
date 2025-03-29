import React from "react";
import {
  PlayPauseFill,
  AddToQueue,
  StarFill,
  PinFill,
  FolderFill,
} from "../icons";

/**
 * The Features component displays a list of features that Music Notes offers.
 */
export default function Features() {
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
    <section className="features-page">
      <h2>Features</h2>
      <p className="page-description">
        Explore and learn more about how Music Notes can act as a place to
        organize your thoughts on anything music related.
      </p>
      <div className="features-container">
        <section className="feature-container note-taking">
          <div className="content-container">
            <h3>Note Taking for Music</h3>
            <p>
              Keep track of your thoughts as you enjoy your favorite music and
              organize your ideas the way you want. Create a note for whatever
              album, artist, song, or playlist you have in your library and
              leverage the functionality of Music Notes to create a customized
              note taking environment for any music realted thoughts.
            </p>
          </div>
          <div className="asset-container">
            <video
              autoPlay
              loop
              muted
              playsInline
              controls
              width={320}
              height={652.25}
            >
              <source src="/videos/note-taking-3.mp4" type="video/mp4" />
            </video>
          </div>
        </section>
        <section className="feature-container">
          <h3>Remember the Good Times</h3>
          <p>
            Add timestamps to easily return to your favorite parts of a song or
            to mark a moment you don&apos;t want to forget.
          </p>
        </section>
        <section className="feature-container keywords">
          <h3>Keywords are Key</h3>
          <p>
            Add any number of keywords to any kind of note to unlock a new level
            of categorization. Search and filter using keywords to easily find
            what you are looking for.
          </p>
          <div className="asset-container">
            <img
              src="/images/keywords-1-cropped.jpg"
              alt=""
              width={320}
              height={651.95}
            />
          </div>
        </section>
        <section className="feature-container">
          <h3>Link Notes Together</h3>
          <p>
            Bring an easy way to make connections between a song and an artist,
            album and a song, or any other combination you can picture. Nest
            links as much as you desire without having to worry about any
            limits.
          </p>
        </section>
        <section className="feature-container">
          <h3>Light and Dark Mode</h3>
        </section>
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
              <source src="/videos/familiar-functions-3.mp4" type="video/mp4" />
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
      </div>
    </section>
  );
}
