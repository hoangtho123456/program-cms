import NotificationService from '@/services/NotificationService.js';

const notification = {
	actions: {
		loadReadMessage: async (context, payload) => {
			try {
				await NotificationService.seen(payload);
			} catch (err) {
				console.warn(err);
			}
		},
		loadReadMessageList: async (context, payload) => {
			try {
				await NotificationService.seenList(payload);
			} catch (err) {
				console.warn(err);
			}
		},
	},
};

export default notification;
