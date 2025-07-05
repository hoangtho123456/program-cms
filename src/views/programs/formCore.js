import i18n from '@/locale';

/**
 * Meta data form
 */
export const META_FORM = {
	description: {
		content: ''
	},
	presentation: {
		content: ''
	},
	prerequisite: {
		content: ''
	},
};

export const description = {
	entity: {
		content: null,
	},
	title: i18n.t('common.description'),
	columns: [
		{
			name: 'content',
			type: 'editor',
		},
	],
};

export const presentation = {
	entity: {
		content: null,
	},
	title: i18n.t('program.presentation'),
	columns: [
		{
			name: 'content',
			type: 'editor',
		},
	],
};

export const prerequisite = {
	entity: {
		content: null,
	},
	title: i18n.t('program.prerequisites'),
	columns: [
		{
			name: 'content',
			type: 'editor',
		},
	],
};
