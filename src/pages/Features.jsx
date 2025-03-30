import React from "react";
import DarkLightMode from "../components/Features/DarkLightMode";
import FamiliarFunctions from "../components/Features/FamiliarFunctions";
import { MusicNote, Link, MusicMic } from "../icons";

/**
 * The Features component displays a list of features that Music Notes offers.
 */
export default function Features() {
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
          <h3>Remember the Good Times</h3>
          <p>
            Add timestamps to easily return to your favorite parts of a song or
            to mark a moment you don&apos;t want to forget.
          </p>
          {/* <div className="asset-container"> */}
          {/*   <img */}
          {/*     src="/images/keywords-1-cropped.jpg" */}
          {/*     alt="" */}
          {/*     width={320} */}
          {/*     height={651.95} */}
          {/*   /> */}
          {/* </div> */}
        </section>
        <section className="feature-container link-notes">
          <h3>Link Notes Together</h3>
          <p>
            Bring an easy way to make connections between a song and an artist,
            album and a song, or any other combination you can picture. Nest
            links as much as you desire without having to worry about any
            limits.
          </p>
          <div className="icon-container">
            <MusicMic className="mic" />
            <div className="link-container">
              <Link className="link" />
            </div>
            <MusicNote className="note" />
          </div>
        </section>
        <DarkLightMode />
        <FamiliarFunctions />
      </div>
    </section>
  );
}
