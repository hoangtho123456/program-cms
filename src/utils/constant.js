import i18n from '@/locale';

export const HOST =
	import.meta.env.VITE_API_URL || location.protocol + '//' + location.host + '/api/'; //domain
export const BASE_URL = import.meta.env.BASE_URL;

export const ROLES_AS_OBJ = {
	admin: 'Administrator',
	user: 'User',
	editor: 'Editor'
};
export const USER_ROLES = Object.keys(ROLES_AS_OBJ).map(key => {
	let roleId = key;
	switch (key) {
		case 'admin':
			roleId = 1;
			break;
		case 'user':
			roleId = 2;
			break;
		case 'editor':
			roleId = 3;
			break;
		default: throw Error('This role is invalid', key)
	}

	return {
		id: roleId,
		name: ROLES_AS_OBJ[key]
	}
});

export const GENDER_TYPES = [
	{ id: '0', name: i18n.t('common.male') },
	{ id: '1', name: i18n.t('common.female') },
];


export const BOOLEAN_TYPES = [
	{ id: 0, name: i18n.t('common.no') },
	{ id: 1, name: i18n.t('common.yes') },
];

// export const STATUS_MAP = {
// 	title: i18n.t('common.title'),
// 	name: i18n.t('common.name'),
// 	createdDate: i18n.t('dashboard.createdDate'),
// 	updatedDate: i18n.t('dashboard.updatedDate'),
// 	// secondCol: i18n.t('dashboard.columnTwo'),
// 	// thirdCol: i18n.t('dashboard.columnThree'),
// 	// fourthCol: i18n.t('dashboard.columnFour'),
// };

export const DATE_PATTERNS = {
	friendly: 'DD/MM/YYYY',
	database: 'YYYY-MM-DD'
};

export const LANGUAGES = [
	{ id: 'fr', name: i18n.t('common.french') },
	{ id: 'en', name: i18n.t('common.english') }
];

export const FORMAT_LIST = [
	{ id: 1, name: i18n.t('common.local') },
	{ id: 2, name: i18n.t('common.remote') }
];
