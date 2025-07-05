import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import { settings } from "@/config";
import locales from "@/locale/vuetify";
import themes from "./vuetifyThemes";

Vue.use(Vuetify);

const opts = {
  theme: {
    options: {
      customProperties: true,
    },
    dark: false,
    themes: themes[0],
  },
  icons: {
    iconfont: "fa",
  },
  lang: {
    locales,
    current: settings.locale,
  },
};

const vuetify = new Vuetify(opts);
export default vuetify;

/**
 * Set theme with number for Vuetify class object
 *
 * @param {Number} index new value
 */
export async function setVuetifyTheme(index) {
  if (vuetify.framework.theme.themes !== themes[index]) {
    vuetify.framework.theme.themes.light =
      themes[index].light || themes[0].light;
    vuetify.framework.theme.themes.dark = themes[index].dark || themes[0].dark;
  } else {
    console.warn(`[Vuetify] "${index}" is current theme `);
  }
}

/**
 * Set the mode to dark/light for the Vuetify class object.
 *
 * @param {Boolean} dark new value
 */
export async function setVuetifyThemeDark(dark) {
  console.log(`[Vuetify] Change theme to "${dark ? "dark" : "light"}"`);
  vuetify.framework.theme.dark = dark;
}
