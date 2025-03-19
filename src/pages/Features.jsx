import React from "react";
import {
  PlayPauseFill,
  AddToQueue,
  StarFill,
  PinFill,
  FolderFill,
} from "../icons";

export default function Features() {
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
        <section className="feature-container">
          <h3>Familar Functionality</h3>
          <ul className="familiar-functions-list">
            <li>
              <p>Favorite</p>
              <StarFill />
            </li>
            <li>
              <p>Pin</p>
              <PinFill />
            </li>
            <li>
              <p>Add to Queue</p>
              <AddToQueue />
            </li>
            <li>
              <p>Playback Controls</p>
              <PlayPauseFill />
            </li>
            <li>
              <p>Folders</p>
              <FolderFill />
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}
