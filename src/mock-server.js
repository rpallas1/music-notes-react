import { createServer, Model, Response } from "miragejs";
import { v4 as uuidv4 } from "uuid";
import { log } from "loglevel";

createServer({
  models: {
    featureRequest: Model,
    contactForm: Model,
  },

  seeds(server) {
    server.create("featureRequest", {
      title: "MacOS App",
      summary: "Bring the app to MacOS with synced notes",
      description: "",
      voteCount: 0,
      dateCreated: new Date("February 10, 2025").getTime(),
    });

    server.create("featureRequest", {
      title: "Create notes for items outside of library",
      summary:
        "Bring notes to the entire Apple Music catalog instead of just the library",
      description:
        "Currently, notes notes can only be created for items that are in a users Apple Music Library. I find that there are times where I want to make connections between notes but don't have an artist or song that is in my library and have to go add it to my library. Instead, having the ability to create notes for any item in the Apple Music catalog without adding it to my library would be a great addition that would make the app more useful.",
      tag: "trending",
      voteCount: 0,
      dateCreated: new Date("October 22, 2024").getTime(),
    });

    server.create("featureRequest", {
      title: "Show songs in playlist for playlist notes",
      summary: "Include all of the songs within a playlist in the note",
      description:
        "The idea behind this features is that when you create a note for a playlist, it would be great to have all of the songs within that playlist show up in the note. This allows the ability to write notes about each song in the playlist and have that note be different that the note for that song. I find myself wanting to write why a song is in a playlist and currently have to create a note for that song, write what I want, and then create a link to the playlist so that they are connected. Having this feature would make it easier to write notes that are more specific to the playlist and not the song.",
      dateCreated: new Date("November, 7, 2024").getTime(),
      voteCount: 99,
    });

    server.create("featureRequest", {
      title: "Easier way to search notes",
      summary: "",
      description:
        "Implement an advanced search functionality that allows users to quickly and easily find specific notes. This could include options to search by keywords, timestamps, song titles, artists, albums, and folders.",
      tag: "under-dev",
      voteCount: -9810,
      dateCreated: new Date("January 4, 2025").getTime(),
    });

    server.create("featureRequest", {
      title: "Spotify Integration",
      summary: "Have the option to create notes from a Spotify account",
      description:
        "Integrate the app with Spotify to allow users to create notes from their Spotify account. This will enable users to take notes on songs, artists, albums, and playlists directly from Spotify, expanding the app's usability.",
      tag: "new",
      voteCount: 35,
      dateCreated: new Date("February 15, 2025").getTime(),
    });

    server.create("featureRequest", {
      title: "Outside of library notes",
      summary:
        "Expand the note-taking capability by being able to take notes on any Apple Music item, not just the ones in your library.",
      description:
        "Allow users to take notes on any item available on Apple Music, not just the ones in their personal library. This would enable users to jot down thoughts and insights on any song, album, or artist they come across on Apple Music.",
      tag: "trending",
      voteCount: 893,
      dateCreated: new Date("December 2, 2024").getTime(),
    });

    server.create("featureRequest", {
      title: "Collaborative Note Taking",
      summary: "Allow multiple users to collaborate on notes in real-time.",
      description:
        "It would be great to have a feature where multiple users can work on the same set of notes simultaneously. This would be particularly useful for group projects or study sessions where everyone can contribute their thoughts and insights.",
      voteCount: 12343,
      dateCreated: new Date("February 20, 2025").getTime(),
    });

    server.create("featureRequest", {
      title: "Customizable Themes",
      summary:
        "Offer different themes and color schemes to personalize the note-taking experience.",
      description:
        "Users should be able to select from a variety of themes and color schemes to customize the look and feel of the app. This would enhance the user experience by allowing for a more personalized interface that suits individual preferences.",
      tag: "implemented",
      voteCount: 135601241,
      dateCreated: new Date("February 18, 2025").getTime(),
    });

    server.create("featureRequest", {
      title: "Voice-to-Text Note Taking",
      summary:
        "Enable users to create notes using voice-to-text functionality.",
      description:
        "Adding a voice-to-text feature would make it easier for users to quickly jot down their thoughts without needing to type. This would be especially useful for users who are on the go or prefer speaking over typing.",
      tag: "new",
      voteCount: 4063,
      dateCreated: new Date("February 22, 2025").getTime(),
    });
  },

  routes() {
    this.namespace = "/sample/api/v1";
    this.logging = false;
    this.passthrough(
      `${import.meta.env.VITE_DEV_API_URL}/**`,
      `${import.meta.env.VITE_PROD_API_URL}/**`,
    );

    this.get("/feature-requests", (schema, request) => {
      return schema.featureRequests.all();
    });

    this.get("/feature-requests/:id", (schema, request) => {
      const id = request.params.id;

      return schema.featureRequests.find(id);
    });

    this.patch("/feature-requests/:id/votes", (schema, request) => {
      const id = request.params.id;
      const { value } = JSON.parse(request.requestBody);
      let featureRequest = schema.featureRequests.find(id);

      if (value !== 1 && value !== -1) {
        return new Response(400, {}, { error: "Invalid vote value" });
      }

      return featureRequest.update({
        voteCount: featureRequest.voteCount + value,
      });
    });

    this.post("/feature-requests", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      const tags = ["new", "trending", "under-dev", "implemented"];
      const tag = tags[Math.floor(Math.random() * tags.length + 2)] || "";

      // Validate request body
      // If valid, create new feature request
      return schema.featureRequests.create({
        ...attrs,
        id: uuidv4(),
        voteCount: 0,
        dateCreated: new Date().getTime(),
        tag: tag,
      });
    });

    this.post("/contact-form", (schema, request) => {
      const attrs = JSON.parse(request.requestBody);

      return schema.contactForms.create({
        ...attrs,
        id: uuidv4(),
        dateCreated: new Date().getTime(),
      });
    });
  },
});
