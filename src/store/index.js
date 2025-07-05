import Vue from 'vue';
import Vuex from 'vuex';
import StorageService from '@/services/StorageService.js';
import syncStorage from './plugins/syncStorage';
import loading from './modules/loading';
import permission from './modules/permission';
import settings from './modules/settings';
import user from './modules/user';
import notif from './modules/notification';
import appDialog from './modules/appDialog';
import appSnackbar from './modules/appSnackbar';
import { autoLoad } from './autoLoad';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		loading,
		permission,
		settings,
		user,
		notif,
		appDialog,
		appSnackbar,
	},
	plugins: [syncStorage({})],
	state: {
		totalNumber: 0,
		autoLoad: { ...autoLoad },
	},
	mutations: {
		SET_TOTAL_NUMBER: (state, payload) => {
			state.totalNumber = payload || 0;
		},
	},
	getters: {
		getList: (state) => (name) => {
			const autoLoad = state.autoLoad[name];
			if (autoLoad && !autoLoad.touched) {
				state.autoLoad[name].touched = true;
				StorageService.autoLoad(state.autoLoad[name]);
			}
			return autoLoad?.list || [];
		},
		getListAsync: async ({ commit, dispatch, getters }, name) => {
			const data = getters.getList(name);
			if (Array.isArray(data) && data.length > 0) {
				return data;
			}
			await new Promise((resolve) => setTimeout(resolve, 100));
			return await dispatch('getListAsync', name);
		}
	},
});
