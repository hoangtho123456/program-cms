import { ROLES_AS_OBJ } from '@/utils/constant';

export default {
	path: '/',
	component: () => import('@/layout/TheLayout.vue'),
	meta: {
		title: '',
		icon: '',
	},
	roles: [ROLES_AS_OBJ.user, ROLES_AS_OBJ.editor],
	children: [
		{
			path: '/news',
			name: 'NewsList',
			meta: { title: 'route.news.base', icon: 'fas fa-newspaper' },
			component: () => import('@/views/news/Table.vue'),
		},
		{
			path: '/news-add',
			name: 'NewsAdd',
			meta: { title: 'route.news.base' },
			component: () => import('@/views/news/Form.vue'),
			hidden: true,
		},
		{
			path: '/news-edit/:id',
			name: 'NewsEdit',
			meta: { title: 'route.news.base' },
			component: () => import('@/views/news/Form.vue'),
			hidden: true,
		},
	],
};
