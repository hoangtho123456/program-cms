/* eslint-disable no-prototype-builtins */
export const debounce = function (fn, wait) {
	let t;
	return function () {
		clearTimeout(t);
		t = setTimeout(() => fn.apply(this, arguments), wait);
	};
};
/**
 * @param {number} ms
 * @returns
 */
export const sleep = function (ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * @param {array} xs
 * @param {function} f
 * @returns array
 */
export const groupBy = (x, f) => x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {});

export const isEmptyObject = (obj) => {
	if (typeof obj !== 'object' || obj === null) {
		return true;
	}
	return Object.keys(obj || {}).length === 0;
};

export const serialize = function (obj) {
	if (!obj) return '';
	const str = [];
	for (const p in obj) {
		if (Array.isArray(obj[p])) {
			obj[p].forEach((e) => {
				str.push(encodeURIComponent(p) + '[]=' + encodeURIComponent(e));
			});
		} else {
			if (obj[p] || parseInt(obj[p]) === 0) {
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
			}
		}
	}
	return str.join('&');
};

export const urltoFile = function (url, filename, mimeType) {
	return fetch(url)
		.then(function (res) {
			return res.arrayBuffer();
		})
		.then(function (buf) {
			return new File([buf], filename, { type: mimeType });
		});
};

export const isUrl = function (s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return regexp.test(s);
};

export const mergeByKey = (target, source, prop) => {
	source.forEach((sourceElement) => {
		let targetElement = target.find((targetElement) => {
			return sourceElement[prop] === targetElement[prop];
		});
		targetElement ? Object.assign(targetElement, sourceElement) : target.push(sourceElement);
	});
	return target;
};

/**
 * @param {*} end YYYY-MM-DD
 * @returns boolean
 */
export const expiredDate = (end) => {
	const d = new Date(end).getTime();
	if (d < new Date().getTime()) {
		return true;
	}
	return false;
};

export const formatDate = (str, dmy = false) => {
	let date, dateStr;
	if (str && str.indexOf('T') > 0) {
		const dateArr = str.split('T');
		dateStr = dateArr[0];
	} else dateStr = str;

	// Define regular expressions for the supported date formats
	const regexes = [
		/^\d{4}-\d{2}-\d{2}$/,
		/^\d{4}\/\d{2}\/\d{2}$/,
		/^\d{2}-\d{2}-\d{4}$/,
		/^\d{2}\/\d{2}\/\d{4}$/,
	];

	// Iterate through the regular expressions to match the input format
	for (const regex of regexes) {
		if (regex.test(dateStr)) {
			// Split the date string based on the separator (/ or -)
			const separator = dateStr.includes('/') ? '/' : '-';
			const dateParts = dateStr.split(separator);

			// Check if the date parts are in the correct order (year, month, day)
			if ((separator === '/' || separator === '-') && dateParts[0].length !== 4) {
				// Swap day and year for the format YYYY/DD/MM
				date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
			} else {
				date = new Date(dateStr);
			}

			break;
		}
	}

	// Check if the date is valid
	if (!date || isNaN(date.getTime())) {
		return 'Invalid Date';
	}

	const outYear = date.getFullYear();
	const outMonth = String(date.getMonth() + 1).padStart(2, '0');
	const outDay = String(date.getDate()).padStart(2, '0');

	if (dmy) return `${outDay}-${outMonth}-${outYear}`;
	return `${outYear}-${outMonth}-${outDay}`;
};

export const hasResponseError = (res = {}) => {
	return (
		res?.constructor !== Object ||
		res.data?.error ||
		res.status === 404 ||
		res.errors ||
		res.error ||
		res.status === 405 ||
		res.status === 500
	);
};
