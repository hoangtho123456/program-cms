import i18n from '@/locale';

/**
 * Meta data form
 */
type MetaKeys = 'description' | 'presentation' | 'prerequisite';
type MetaFormType = Record<MetaKeys, {}>;
export const META_FORM: MetaFormType = {
	description: {
		content: '',
	},
	presentation: {
		content: ''
	},
	prerequisite: {
		content: ''
	},
};

export const description:object = {
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

export const presentation:object = {
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

export const prerequisite:object = {
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
