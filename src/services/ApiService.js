import store from '@/store';

const execAsyncRes = (res, inline) => {
	var random = parseInt(Math.random() * 10);

	let data = res;
	if (res instanceof FormData) {
		data = {};
		for (let [key, value] of res.entries()) {
			data[key] = value;
		}
	}

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (random <= 8) {
				resolve(data);
			} else {
				if (!inline) {
					store.commit('setErrorDialog', {
						appMessage: { error: 'Error!!!' }
					});
					resolve(false);
				} else {
					reject({ error: 'Error!!!' });
				}
			}
		}, 2000);
	});
}

export default () => {
	const apiWrapper = {};

	apiWrapper.post = async function (url, data, inline = false, contentType = 'application/json') {
		return execAsyncRes(data, inline);
	};
	apiWrapper.put = async function (url, data, inline = false, contentType = 'application/json') {
		return execAsyncRes(data, inline);
	};
	apiWrapper.patch = async function (url, data, inline = false) {
		return execAsyncRes(data, inline);
	};
	apiWrapper.delete = async function (url, inline = false) {
		return execAsyncRes(true, inline);
	};
	apiWrapper.get = function (url, res, inline = false, noEncoding = false, timeZone = true) {
		return execAsyncRes(res, inline);
	};
	apiWrapper.formData = (data) => {
		const formData = new FormData();
		Object.keys(data).forEach((key) => {
			if (Array.isArray(data[key])) {
				if (data[key].length > 0) {
					data[key].forEach((value) => {
						formData.append(`${key}[]`, value.id || value);
					});
				} else {
					formData.append(key, []);
				}
			} else if (typeof data[key] === 'object' && data[key] !== null && data[key].id) {
				formData.append(key, data[key].id);
			} else {
				if (data[key] === null || data[key] === undefined) {
					formData.append(key, '');
				} else {
					formData.append(key, data[key]);
				}
			}
		});
		return formData;
	};

	return apiWrapper;
};
