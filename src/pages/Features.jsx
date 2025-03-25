import React from "react";
import {
  PlayPauseFill,
  AddToQueue,
  StarFill,
  PinFill,
  FolderFill,
} from "../icons";

export default function Features() {
  const NUM_ICONS = 5;
  const [iconPositions, setIconPositions] = React.useState([
    "center",
    "right",
    "right-outer",
    "left-outer",
    "left",
  ]);
  const iconIntervals = [3000, 3200, 3100, 3100, 4500];
  const [centerIconPosition, setCenterIconPosition] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCenterIconPosition((prev) => (prev + 1) % NUM_ICONS);

      setIconPositions((prev) => {
        const newIconPositions = [...prev];

        newIconPositions.unshift(newIconPositions.pop());

        return newIconPositions;
      });
    }, iconIntervals[centerIconPosition]);
    return () => clearInterval(interval);
  }, [centerIconPosition]);

  return (
    <section className="features-page">
      <h2>Features</h2>
      <p className="page-description">
        Explore and learn more about how Music Notes can act as a place to
        organize your thoughts on anything music related.
      </p>
      <div className="features-container">
        <section className="feature-container">
          <h3>Note Taking for Music</h3>
          <p>
            Keep track of your thoughts as you enjoy your favorite music and
            organize your ideas the way you want. Create a note for whatever
            album, artist, song, or playlist you have in your library and
            leverage the functionality of Music Notes to create a customized
            note taking environment for any music realted thoughts.
          </p>
        </section>
        <section className="feature-container">
          <h3>Remember the Good Times</h3>
          <p>
            Add timestamps to easily return to your favorite parts of a song or
            to mark a moment you don&apos;t want to forget.
          </p>
        </section>
        <section className="feature-container">
          <h3>Keywords are Key</h3>
          <p>
            Add any number of keywords to any kind of note to unlock a new level
            of categorization. Search and filter using keywords to easily find
            what you are looking for.
          </p>
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
          <img
            src="/images/familiar-functions-2-compressed.gif"
            alt="Familiar Functionality"
          />
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
        </section>
      </div>
    </section>
  );
}
