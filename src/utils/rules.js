import i18n from '@/locale';

export default {
	emptyRules: (v) => !!v || i18n.t('error.requiredField'),
	emptyArrayRules: (v) => (!!v && v.length !== 0) || i18n.t('error.requiredField'),
	minLengthRules: (v) => !v || (v && v.length >= 6) || i18n.t('error.minLength', { number: 6 }),
	maxLength255Rules: (v) => !v ||
		(v && v.replace(/\s+/g, '').length <= 255) || i18n.t('error.maxLength', { number: 255 }),
	emailRules: (v) => !v || /.+@.+\..+/.test(v) || i18n.t('error.invalidEmail'),
	passwordRules: (v) =>
		pattern.test(
			/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,36}$/
		) || i18n.t('error.passwordRequired'),
	booleanRules: v => !!v || (parseInt(v) === 0) || i18n.t('error.requiredField'),
	urlRules: (v) =>
		!v ||
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(v) ||
		i18n.t('error.invalidUrl'),
	numberMinZero: (v) => !v || parseInt(v.toString().replaceAll('.', '')) >= 0 || i18n.t('error.minNumber', {number: 0}),
	numberMaxOneMil: v => !v || (parseInt(v.toString().replaceAll('.', '')) <= 1000000) || i18n.t('error.maxNumber', {number: 1000000})
};
