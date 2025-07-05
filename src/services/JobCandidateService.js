import ApiService from '@/services/ApiService.js';
import serverRes from '@/mockData/candidates.json';

const BASE_URI = 'offer';

export default {
	list(params = {}) {
		return ApiService().get('', serverRes);
	},

	detail(entityId) {
		const found = serverRes.list.find(item => item.id === parseInt(entityId));

		return ApiService().get('', found);
	},

	add(entity, inline = true) {
		const uri = `${BASE_URI}`;
		return ApiService().post(uri, ApiService().formData(entity), inline, 'multipart/form-data');
	},

	update(entity, inline = true) {
		const uri = `${BASE_URI}`;
		return ApiService().post(uri, ApiService().formData(entity), inline, 'multipart/form-data');
	},

	delete(entityId) {
		return ApiService().delete(`${BASE_URI}/${entityId}`);
	},

	toggleStatus (entity) {
		serverRes.list = serverRes.list.map(item => {
			if (item.id === entity.id) {
				item.status = !item.status ? 1 : 0;
			}

			return item;
		});
		console.log(serverRes, entity)
		return ApiService().put();
	},
};
