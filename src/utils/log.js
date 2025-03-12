import log from "loglevel";

if (import.meta.env.PROD) {
  log.setLevel("error");
} else {
  log.setLevel("debug");
}

export default log;
