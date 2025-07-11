/**
 * vva v0.0.5
 * (c) 2019 NelsonEAX
 * @license MIT
 */

import Vue from "vue";
import VueI18n from "vue-i18n";

import { settings } from "@/config";
import vuetify from "@/locale/vuetify";
import en from "./en_US";
import fr from "./fr_FR";

Vue.use(VueI18n);

const messages = {
  en: {
    ...en,
    $vuetify: vuetify.en,
  },
  fr: {
    ...fr,
    $vuetify: vuetify.fr,
  },
};

/**
 * Available locales
 */
export const locales = [
  {
    title: "English",
    locale: "en",
    abbr: "ENG",
  },
  {
    title: "Français",
    locale: "fr",
    abbr: "FR",
  },
];

/**
 * VueI18n instance
 */
const i18n = new VueI18n({
  // set locale options: en_US | fr_FR | vi_VN
  locale: settings.locale,
  messages,
});

/**
 * Set locale to new value at Vue and Vuex.
 *
 * @param {Boolean} newLocale themeDark new value
 */
export async function setLocale(locale) {
  if (i18n.locale !== locale) {
    console.log(`[Locale] Set to "${locale}"`);
    i18n.locale = locale || settings.locale;
  } else {
    console.warn(`[Locale] "${locale}" is current`);
  }
}

export default i18n;
