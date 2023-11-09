import { INotification } from "~/@types";

export const useNotificationStore = defineStore("notification", {
	state: () => ({
		notificationList: [] as INotification[],
	}),
	actions: {
		addErrorNotification(header: string, message: string) {
			this.notificationList.push({
				header,
				id: `${Date.now()}`,
				message,
				type: 'error',
			});
		},
		addWarnNotification(header: string, message: string) {
			this.notificationList.push({
				header,
				id: `${Date.now()}`,
				message,
				type: 'warning',
			});
		},
		addInfoNotification(header: string, message: string) {
			this.notificationList.push({
				header,
				id: `${Date.now()}`,
				message,
				type: 'info',
			});
		},
		dismissNotification(id: string) {
			this.notificationList = this.notificationList.filter((n) => n.id !== id);
		},
	},
});
