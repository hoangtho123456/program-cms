import { ROLES_AS_OBJ } from '@/utils/constant';
import routesNames from "@/router/routesNames";

export default {
	path: '/',
	component: () => import('@/layout/TheLayout.vue'),
	meta: {
		title: 'program.programs',
		icon: 'fas fa-file-alt',
	},
	roles: [ROLES_AS_OBJ.user],
	children: [
		{
			path: '/programs',
			name: routesNames.program.home,
			meta: {
				title: 'program.programs',
				icon: 'fas fa-file-alt',
			},
			component: () => import('@/views/programs/Table.vue'),
		},
		{
			path: '/programs/add',
			name: routesNames.program.add,
			hidden: true,
			meta: { title: 'program.programs' },
			component: () => import('@/views/programs/Form.vue'),
		},
		{
			path: '/programs/:id',
			name: routesNames.program.edit,
			hidden: true,
			meta: { title: 'program.programs' },
			component: () => import('@/views/programs/Form.vue'),
		},
	],
};
