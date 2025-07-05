import routesNames from "@/router/routesNames";

export default {
	path: '/',
	component: () => import('@/layout/TheLayout.vue'),
	hidden: true,
	meta: {
		title: 'route.admin.base',
	},
	children: [
		{
			path: '/admin-list',
			name: routesNames.admin.home,
			meta: { title: 'route.admin.adminList' },
			hidden: true,
			component: () => import('@/views/admin/Table.vue'),
		},
		{
			path: '/admin/add',
			name: routesNames.admin.add,
			meta: { title: 'route.admin.addAdmin' },
			component: () => import('@/views/admin/Form.vue'),
			hidden: true,
		},
		{
			path: '/admin/:id',
			name: routesNames.admin.edit,
			meta: { title: 'route.admin.editAdmin' },
			component: () => import('@/views/admin/Form.vue'),
			hidden: true,
		},
	],
};
