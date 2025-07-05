import i18n from '@/locale';
import UserService from '@/services/UserService.js';

const user = {
	state: {
		token: '',
		roles: [],
		user: {},
	},

	getters: {
		token: (state) => state.token,
		roles: (state) => state.roles,
		user: (state) => {
			return state.user;
		},
	},

	mutations: {
		SET_USER_INFO: (state, payload) => {
			if (payload.logout) {
				state.token = '';
				state.roles = [];
				state.user = {};
			} else {
				state.token = payload.token || state.token;
				state.roles = payload.roles || state.roles;
				state.user = payload ? payload : state.user;
			}
		},
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
	},

	actions: {
		loginByEmail: async ({ commit }, payload) => {
			try {
				const obj = { email: payload.email };
				if (payload.token) obj.token = payload.token;
				else obj.password = payload.password;

				const loginResult = await UserService.login(obj);
				if (!loginResult.error) {
					await commit('SET_TOKEN', loginResult.password);

					const roles = loginResult.subRoles.map((x) => x.name);
					const user = {
						...loginResult,
						roles: roles,
					};

					commit('SET_USER_INFO', user);
					commit('SET_ROUTES');

					return false;
				} else {
					return loginResult.error || i18n.t('common.checkYourLoginInformation');
				}
			} catch (err) {
				console.warn('[vuex.user] LoginByEmail', err);
			}
		},
		logOut: async ({ commit }) => {
			try {
				commit('SET_USER_INFO', { logout: true });
				commit("SET_SETTINGS", {});
			} catch (err) {
				console.warn('[vuex.user] LogOut', err);
			}
		},
	},
};

export default user;
