import Vue from 'vue';
import i18n from '@/locale';
import { expiredDate } from '@/utils';
import { BASE_URL, GENDER_TYPES, ROLES_AS_OBJ } from '@/utils/constant';
import rules from '@/utils/rules';
import { formatDate } from '@/utils';

Vue.mixin({
	computed: {
		emptyRules: () => [rules.emptyRules],
		emptyArrayRules: () => [rules.emptyArrayRules],
		minLengthRules: () => [rules.minLengthRules],
		maxLength255Rules: () => [rules.maxLength255Rules],
		emailRules: () => [rules.emailRules],
		passwordRules: () => [rules.passwordRules],
		genderTypes() {
			return GENDER_TYPES;
		},
		booleanRules: () => [rules.booleanRules],
		urlRules: () => [rules.urlRules],
		numberZeroToOneMil: () => [rules.numberMinZero, rules.numberMaxOneMil],
		rolesAsObj: () => ({...ROLES_AS_OBJ})
	},
	methods: {
		getName(list = [], obj) {
			const id = obj?.id || obj;
			const item = list.find((x) => x.id == id);
			return item?.name || '';
		},
		listDisc(items) {
			if (!items || items.length === 0) return '';
			const arr = items || [];
			let str = '';
			for (const el of arr) {
				str += `• ${this.truncateText(el.name, 42)}\n`;
			}
			return str;
		},
		expiredDate(end) {
			return expiredDate(end);
		},
		assetsUrl(relativePath) {
			return `${BASE_URL}${relativePath}`;
		},
		saveFile(file, fileName, blanked = false) {
			const downloadLink = document.createElement('a');
			downloadLink.href = file;
			downloadLink.download = fileName;
			if(blanked) {
				downloadLink.target = "_blank";
			}
			downloadLink.click();
		},
		truncateText(val, length = 40) {
			const more = val.length > length ? '...' : '';
			return val.substring(0, length) + more;
		},
		formatDate(date, dmy = true) {
			return date ? formatDate(date, dmy) : i18n.t('common.unknown');
		},
		parseCurrency(val, suffix = '') {
			if (parseInt(val) === 0) return '0';

			const out = String(val || '').replace(/(\d)(?=(\d{3})+\b)/g, '$1.');
			return out ? out + suffix : '';
		},
		convertMbToByte (val = 0) {
			return val * 1024 * 1024;
		}
	},
});
