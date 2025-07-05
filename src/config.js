import { default as packageJson } from "../package.json";

export const title = packageJson.title;
export const version = packageJson.version;
export const storage = "localStorage";

/**
 * @type {String} 'vva_'
 * @description Key prefix for data in storage.
 */
export const prefix = "self_";

/**
 * @type {Number} 604800
 * @description User session storage time in seconds.
 * Default 7 days
 */
export const ttl = 7 * 24 * 3600;

/**
 * @type {Object}
 * @description Default application settings.
 */
export const settings = {
  locale: "en", // language config
  navbar: {
    show: true,
    width: 270,
    clipped: true, // clipped false side bar full height
  },
  theme: {
    index: 0,
    dark: false,
  },
};
