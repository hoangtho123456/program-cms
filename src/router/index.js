import Vue from 'vue';
import Router from 'vue-router';

/* Router Modules */
import auth from './modules/auth';
import errors from './modules/errors';
import programs from './modules/programs';
import news from './modules/news';
import jobBoard from './modules/jobBoard';
import dashboard from './modules/dashboard';
import admin from './modules/admin';

Vue.use(Router);

/**
 * hidden: true                                     hide on the menu
 * meta: {hidden: true}															hide a Breadcrumb
 * icon: 'svg-name' || 'font awesome'               the icon show in the sidebar
 * roles: ["Administrator", "User", "Editor"]   will control the page roles (you can set multiple roles)
 */

export const constantRoutes = [
	...auth,
	dashboard,
	programs,
	news,
	jobBoard,
	admin,
	errors,
	{ path: '*', redirect: '/error/404', hidden: true }
];

export default new Router({
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRoutes,
});
