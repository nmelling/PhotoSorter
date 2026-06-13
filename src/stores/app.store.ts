import { defineStore } from "pinia";

export const useAppstore = defineStore("appstore", {
	state: () => ({
		menuKey: "",
		sourcePath: "",
		targetPath: "",
	}),
	actions: {
		setSource(path: string) {
			this.sourcePath = path;
		},
		setTarget(path: string) {
			this.targetPath = path;
		},
		setMenuKey(key: string) {
			this.menuKey = key;
		},
	},
});
