import { ROLES_AS_OBJ } from '@/utils/constant';
import routesNames from "@/router/routesNames";

export default {
	path: '/',
	component: () => import('@/layout/TheLayout.vue'),
	name: '',
	roles: [ROLES_AS_OBJ.admin],
	meta: {
		title: 'route.jobBoard.base',
		icon: 'fas fa-suitcase',
	},
	children: [
		{
			path: '/job-board',
			name: routesNames.jobBoard.home,
			meta: {
				title: 'route.jobBoard.offers',
			},
			component: () => import('@/views/jobBoard/Table.vue'),
		},
		{
			path: '/job-board/:id',
			name: routesNames.jobBoard.edit,
			meta: {
				title: 'route.jobBoard.base',
			},
			component: () => import('@/views/jobBoard/OfferDetail.vue'),
			hidden: true,
		},
		{
			path: '/job-board-candidates',
			name: routesNames.jobBoard.candidates,
			meta: {
				title: 'route.jobBoard.candidates',
			},
			component: () => import('@/views/jobBoard/TableCandidates.vue'),
		},
		{
			path: '/job-board-candidates/:id',
			name: routesNames.jobBoard.editCandidate,
			hidden: true,
			meta: {
				title: 'route.jobBoard.candidates',
			},
			component: () => import('@/views/jobBoard/CandidateDetail.vue'),
		},
	],
};
