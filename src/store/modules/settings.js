import { settings as defaultSettings, version } from "@/config";
import { setVuetifyThemeDark, setVuetifyTheme } from "@/plugins/vuetify";
import { setLocale } from "@/locale";

const getDefaultSettings = () => {
  const settings = JSON.parse(JSON.stringify(defaultSettings));
  return settings;
};

const settings = {
  state: getDefaultSettings(),
  getters: {
    version: () => version,
    locale: (state) => state.locale,
    navbarShow: (state) => state.navbar.show,
    navbarClipped: (state) => state.navbar.clipped,
    navbarWidth: (state) => state.navbar.width,
  },
  mutations: {
    SET_SETTINGS: (state, payload) => {
      state.locale = payload.locale || state.locale;
      state.navbar = payload.navbar || state.navbar;

      // apply settings to plugins
      setVuetifyTheme(state.theme.index);
      setVuetifyThemeDark(state.theme.dark);
      setLocale(state.locale);
    },
    SET_LOCALE: (state, payload) => {
      state.locale = payload.locale;
    },
    TOOLBAR_DENSE_TOGGLE: (state) => {
      state.dense = !state.dense;
    },
    NAVBAR_TOGGLE: (state) => {
      state.navbar.show = !state.navbar.show;
    },
    NAVBAR_STATE: (state, payload) => {
      state.navbar.show = payload.state;
    },
  },
  actions: {
    setLanguage: async (context, payload) => {
      context.commit("SET_LOCALE", payload);
      setLocale(payload.locale);
    },
  },
};

export default settings;
