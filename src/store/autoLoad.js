import ProgramService from '@/services/ProgramService.js';
import UserService from '@/services/UserService.js';
import NotificationService from '@/services/NotificationService.js';
import ProgramCateService from '@/services/ProgramCateService.js';
import routesNames from "@/router/routesNames";

export const autoLoad = {
	programList: {
		list: [],
		loader: ProgramService.list,
		touched: false,
		clearRoute: routesNames.program.home
	},
	userRoles: {
		list: [],
		loader: UserService.roles,
		touched: false,
		clearRoute: routesNames.admin.home
	},
	messages: {
		list: [],
		loader: NotificationService.list,
		touched: false,
		clearRoute: routesNames.news.home
	},
	programCateList: {
		list: [],
		loader: ProgramCateService.list,
		touched: false,
		clearRoute: routesNames.program.home
	},
};
