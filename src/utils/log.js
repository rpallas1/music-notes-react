import log from "loglevel";

// Set log level based on environment
if (import.meta.env.PROD) {
  log.setLevel("error");
} else {
  log.setLevel("debug");
}

export default log;
