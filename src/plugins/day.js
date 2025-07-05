/**
 * https://www.npmjs.com/package/vue-dayjs
 * @author linyupark@gmail.com
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
const InvalidReturn = '';
const LangSet = {
	cn: {
		Y: '年',
		M: '月',
		D: '天',
		h: '小时',
		m: '分',
		s: '秒',
		ago: '前',
		just: '刚刚',
	},
	en: {
		Y: 'y',
		M: 'mo',
		D: 'd',
		h: 'hours',
		m: 'minutes',
		s: 's',
		ago: ' ago',
		just: 'just now',
	},
	vi: {
		Y: ' năm',
		M: ' tháng',
		D: ' ngày',
		h: ' giờ',
		m: ' phút',
		s: ' giây',
		ago: ' trước',
		just: 'vừa tức thì',
	},
};
const wrapZero = function (n) {
	return n < 10 ? '0' + n : n;
};

// 记录不同 target 计时器
let timer = {};
export { dayjs };
export default {
	/**
	 * 安装Vue插件
	 * @param {Vue} Vue
	 * @param {object} options 插件引入的参数对象
	 */
	install(Vue, options = {}) {
		// 显示语言
		const lang = LangSet[options.lang || 'cn'];

		// 是否开启调试
		const debug = options.debug || false;

		// 激活的过滤器
		const filters = options.filters || {
			ago: 'ago',
		};

		// 激活的指令
		const directives = options.directives || {
			countdown: 'countdown',
		};

		// 全局注入 dayjs
		Vue.prototype.$dayjs = dayjs;

		/**
		 * 倒计时指令
		 */
		'countdown' in directives &&
			Vue.directive(directives['countdown'], (el, binding) => {
				let from, target, dArray, offset, str, format;

				if (!binding.value || !binding.value.target) {
					return (el.innerText = InvalidReturn);
				}
				format = binding.value.format || 'HH:mm:ss';
				target = dayjs(binding.value.target);
				if (!target.isValid()) {
					return (el.innerText = InvalidReturn);
				}
				timer[target.valueOf()] && clearTimeout(timer[target.valueOf()]);
				const count = () => {
					from = dayjs();
					dArray = from.valueOf() <= target.valueOf() ? [target, from] : [target, target];
					let diffD = dArray[0].diff(dArray[1], 'day');
					let diffh, diffm, diffs;
					offset = dArray[0];
					str = format;
					if (diffD > 0 && format.match('DD')) {
						str = str.replace('DD', diffD);
						offset = offset.subtract(diffD, 'day');
					}
					diffh = offset.diff(dArray[1], 'hour');
					str = str.replace('HH', wrapZero(diffh));
					offset = offset.subtract(diffh, 'hour');
					diffm = offset.diff(dArray[1], 'minute');
					str = str.replace('mm', wrapZero(diffm));
					offset = offset.subtract(diffm, 'minute');
					diffs = offset.diff(dArray[1], 'second');
					str = str.replace('ss', wrapZero(diffs));
					el.innerText = str;
					timer[target.valueOf()] = setTimeout(count, 1000);
				};
				count();
			});

		/**
		 * dayjs {{ someDate | dayjs('YYYY-MM-DD') }}
		 */
		Vue.filter('dayjs', (value, method, ...params) => {
			let d = dayjs(value);
			if (!d.isValid()) return InvalidReturn;
			if (method) {
				return d[method].apply(d, params);
			}
		});

		/**
		 * 距离某日期，用于一些对具体时间不敏感的友好提示，显示多少内容可自定义
		 */
		'ago' in filters &&
			Vue.filter(filters['ago'], (value) => {
				const p = dayjs(value);
				const d = dayjs();
				let str = '';

				if (!p.isValid()) return InvalidReturn;
				let diffY = d.diff(p, 'year');
				let diffM = d.diff(p, 'month');
				let diffD = d.diff(p, 'day');
				let diffh = d.diff(p, 'hour');
				let diffm = d.diff(p, 'minute');
				let diffs = 0;
				let offset = null;

				if (diffD > 0) {
					return p.format('DD-MM-YYYY');
				}

				if (diffh > 0) {
					str += diffh;
					if (str === '1') {
						return Vue.prototype.$t('1 hour');
					} else return str + ' ' + Vue.prototype.$t('hours');
				}

				if (diffm > 0) {
					str += diffm + ' ' + Vue.prototype.$t('minutes');
					return str;
				}
				if (diffm < 1) {
					return Vue.prototype.$t('A few seconds ago');
				}

				if (diffs > 0) {
					if (diffs < 30) {
						return lang.just;
					}
					str += diffs + ' ' + lang.s;
				}

				return Vue.prototype.$t('1 minute');
			});
	},
};
