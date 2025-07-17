
import Vue from 'vue'
declare module 'vue/types/vue' {
  import VueRouter, { Route } from 'vue-router'
  import VueI18n from "vue-i18n"

  interface Vue {
    $router: VueRouter,
    parseCurrency: (val: number | NoneValue | unknown) => string,
    $t: VueI18n['t'],
  }
}
