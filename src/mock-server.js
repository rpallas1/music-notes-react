import { createServer, Model, Response } from "miragejs";

createServer({
  models: {
    featureRequest: Model,
  },

  seeds(server) {
    server.create("featureRequest", {
      id: 1,
      title: "Easier way to search notes",
      summary: "",
      description:
        "Implement an advanced search functionality that allows users to quickly and easily find specific notes. This could include options to search by keywords, timestamps, song titles, artists, albums, and folders.",
      tag: "under-dev",
      voteCount: 10,
      dateCreated: new Date("January 4, 2025").getTime(),
    });

    server.create("featureRequest", {
      id: 2,
      title: "Spotify Integration",
      summary: "Have the option to create notes from a Spotify account",
      description:
        "Integrate the app with Spotify to allow users to create notes from their Spotify account. This will enable users to take notes on songs, artists, albums, and playlists directly from Spotify, expanding the app's usability.",
      tag: "new",
      voteCount: 35,
      dateCreated: new Date("February 15, 2025").getTime(),
    });

    server.create("featureRequest", {
      id: 3,
      title: "Outside of library notes",
      summary:
        "Expand the note-taking capability by being able to take notes on any Apple Music item, not just the ones in your library.",
      description:
        "Allow users to take notes on any item available on Apple Music, not just the ones in their personal library. This would enable users to jot down thoughts and insights on any song, album, or artist they come across on Apple Music.",
      tag: "trending",
      voteCount: 7,
      dateCreated: new Date("December 2, 2024").getTime(),
    });

    server.create("featureRequest", {
      id: 4,
      title: "Collaborative Note Taking",
      summary: "Allow multiple users to collaborate on notes in real-time.",
      description:
        "It would be great to have a feature where multiple users can work on the same set of notes simultaneously. This would be particularly useful for group projects or study sessions where everyone can contribute their thoughts and insights.",
      voteCount: 22,
      dateCreated: new Date("February 20, 2025").getTime(),
    });

    server.create("featureRequest", {
      id: 5,
      title: "Customizable Themes",
      summary:
        "Offer different themes and color schemes to personalize the note-taking experience.",
      description:
        "Users should be able to select from a variety of themes and color schemes to customize the look and feel of the app. This would enhance the user experience by allowing for a more personalized interface that suits individual preferences.",
      tag: "implemented",
      voteCount: 15,
      dateCreated: new Date("February 18, 2025").getTime(),
    });

    server.create("featureRequest", {
      id: 6,
      title: "Voice-to-Text Note Taking",
      summary:
        "Enable users to create notes using voice-to-text functionality.",
      description:
        "Adding a voice-to-text feature would make it easier for users to quickly jot down their thoughts without needing to type. This would be especially useful for users who are on the go or prefer speaking over typing.",
      tag: "new",
      voteCount: 40,
      dateCreated: new Date("February 22, 2025").getTime(),
    });
  },

  routes() {
    this.namespace = "api";
    this.logging = false;

    this.get("/feature-requests", (schema, request) => {
      return schema.featureRequests.all();
    });

    this.get("/feature-requests/:id", (schema, request) => {
      const id = request.params.id;

      return schema.featureRequests.find(id);
    });

    this.put("/feature-requests/:id/upvote", (schema, request) => {
      const id = request.params.id;
      let featureRequest = schema.featureRequests.find(id);

      return featureRequest.update({ voteCount: featureRequest.voteCount + 1 });
    });

    this.put("/feature-requests/:id/downvote", (schema, request) => {
      const id = request.params.id;
      let featureRequest = schema.featureRequests.find(id);

      return featureRequest.update({ voteCount: featureRequest.voteCount - 1 });
    });
  },
});
