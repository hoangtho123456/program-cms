import ApiService from '@/services/ApiService.js';
import serverRes from '@/mockData/programs.json';

const BASE_URI = 'program';

export default {
	list(params = {}) {
		let res = structuredClone(serverRes);
		if (params.filter_programCategory) {
			res.list = res.list.filter(item => item.programCategory.id === params.filter_programCategory);
		}
		if (params.member_format) {
			res.list = res.list.filter(item => item.format === params.member_format);
		}
		if (params.member_language) {
			res.list = res.list.filter(item => item.language === params.member_language);
		}
		if (params.filter_bool) {
			res.list = res.list.filter(item => item.bool === params.filter_bool);
		}
		if (params.filter_name_like) {
			var regex = new RegExp(params.filter_name_like, 'gi');
			res.list = res.list.filter(item => regex.test(item.name));
		}

		return ApiService().get('', res);
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
		const uri = `${BASE_URI}/update`;

		return ApiService().post(uri, ApiService().formData(entity), inline, 'multipart/form-data');
	},

	delete(entityId) {
		serverRes.list = serverRes.list.filter(item => item.id !== entityId);
	
		return ApiService().delete(`${BASE_URI}/${entityId}`);
	},
};
