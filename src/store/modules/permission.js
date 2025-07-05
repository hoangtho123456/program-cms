import { constantRoutes } from '@/router';

const permission = {
	state: {
		routes: [],
	},
	getters: {
		appRoutes: (state) => {
			const routes = JSON.parse(JSON.stringify(state.routes));

			return routes;
		},
	},
	mutations: {
		SET_ROUTES: (state, routes = []) => {
			state.routes = constantRoutes.concat(routes);
		},
	},
};

export default permission;
