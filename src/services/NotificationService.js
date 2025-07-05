import serverRes from '@/mockData/messages.json';

export default {
	list(params) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(serverRes);
			}, 2000);
		});
	},

	detail(entityId) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(entityId);
			}, 2000);
		});
	},

	add(entity) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(entity);
			}, 2000);
		});
	},

	update(entity) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(entity);
			}, 2000);
		});
	},

	delete(entityId) {
		const list = serverRes.filter(item => item.id !== entityId);
		return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(list);
      }, 2000);
    });
	},
	seen (entityId) {
		const list = serverRes?.list.filter(item => item.id !== entityId);
		return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(list);
      }, 2000);
    });
	},
};
