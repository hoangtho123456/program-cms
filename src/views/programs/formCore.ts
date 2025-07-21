import i18n from '@/locale';

type AnyObj =  Record<string, any>;

/**
 * Meta data form
 */
type MetaKeys = 'description' | 'presentation' | 'prerequisite';
type MetaFormType = Record<MetaKeys, AnyObj>;
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

export const description:AnyObj = {
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

export const presentation:AnyObj = {
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

export const prerequisite:AnyObj = {
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
