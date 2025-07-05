import 'windi.css';
import Vue from 'vue';
import { createApp, h } from 'vue-demi';
import '@/assets/scss/main.scss';
import router from '@/router';
import { settings } from '@/config';
import '@/router/permission';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import i18n from '@/locale';
import '@/mixins/globalMixins';
import App from '@/App.vue';

/**
 * Component & directive extend
 */
import { InlineSvgPlugin } from 'vue-inline-svg';
Vue.use(InlineSvgPlugin);

import Dayjs from '@/plugins/day';
Vue.use(Dayjs, {
	lang: settings.locale,
	filters: {
		ago: 'ago',
	},
});

import DatePicker from '@/components/DatePicker.vue';
Vue.component('DatePicker', DatePicker);

import AppLogo from '@/components/Logo.vue';
Vue.component('AppLogo', AppLogo);

import VueMask from 'v-mask';
Vue.use(VueMask);

import CKEditorWrapper from '@/components/CKEditor.vue';
Vue.component('ckeditor', CKEditorWrapper);

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
Vue.component('vue-cropper', VueCropper);

import VueDragscroll from 'vue-dragscroll';
Vue.directive('dragscroll', VueDragscroll);
/**
 * end Component & directive
 */

Vue.config.productionTip = false;
Vue.config.devtools = true;

const app = createApp({
	router,
	store,
	i18n,
	vuetify,
	render: () => h(App),
});

app.mount('#app');
