import ApiService from '@/services/ApiService.js';
import adminData from '@/mockData/admin.json';
import userData from '@/mockData/user.json';
import userSecond from '@/mockData/userSecond.json';
import editorData from '@/mockData/editor.json';
import { USER_ROLES } from '@/utils/constant';

let users = [
	adminData,
	userData,
	editorData,
	userSecond
];

export default {
	login(data, inlinedRes = true) {
		const errorRes = {
			error: "Username or password is incorrect",
			action: "authenticate",
			code: 403,
		}

		return new Promise((resolve, reject) => {
      setTimeout(() => {
				if (
					(
						adminData.email === data.email &&
						adminData.password === data.password
					) ||
					(
						userData.email === data.email &&
						userData.password === data.password
					) ||
					(
						editorData.email === data.email &&
						editorData.password === data.password
					) ||
					(
						userSecond.email === data.email &&
						userSecond.password === data.password
					)
				) {
					if (adminData.email === data.email) {
						resolve({...adminData});
					} else if(userData.email === data.email) {
						resolve({...userData});
					} else if(editorData.email === data.email) {
						resolve({...editorData});
					} else if(userSecond.email === data.email) {
						resolve({...userSecond});
					}
				} else {
					if (!inlinedRes) {
						reject(errorRes);
					} else {
						resolve(errorRes);
					}
				}
      }, 2000);
    });
	},

	roles() {
		return structuredClone(USER_ROLES);
	},

	list (params) {
		let tempUsers = [...users];
		if (params?.filter_roles) {
			tempUsers = tempUsers.filter(user => {
				return user.subRoles.find((userRole) => userRole.id === parseInt(params.filter_roles))
			});
		}

		return ApiService().get('', {
			total: tempUsers.length,
			totalPages: 1,
			currentPage: 1,
			list: [...tempUsers]
		});
	},

	detail (entityId) {
		if (parseInt(entityId) === adminData.id) return adminData;
		if (parseInt(entityId) === editorData.id) return editorData;
		if (parseInt(entityId) === userData.id) return userData;
		if (parseInt(entityId) === userSecond.id) return userSecond;

		return {};
	},

	add (entity, inline =  true) {
		return ApiService().post('/', ApiService().formData(entity), inline, 'multipart/form-data');
	},

	update (entity, inline =  true) {
		return ApiService().post('/', ApiService().formData(entity), inline, 'multipart/form-data');
	},

	toggleStatus (entity) {
		users = users.map(user => {
			if (user.id === entity.id) {
				user.status = !user.status ? 1 : 0;
			}

			return user;
		});

		return true;
	},

	delete(entityId) {
		users = users.filter(user => user.id !== entityId);

		return ApiService().post();
	},
};
