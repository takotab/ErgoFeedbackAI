import Constants from "expo-constants";
const { manifest } = Constants;
YOUR_SERVER_URL = "ergoscan.appspot.com";

export const api =
  "http://" +
  (typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost
        .split(`:`)
        .shift()
        .concat(`:8080`)
    : YOUR_SERVER_URL);
