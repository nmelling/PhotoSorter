import { open } from "@tauri-apps/plugin-dialog";
import { defineStore } from "pinia";

async function selectFolder(): Promise<string> {
	console.log("selecting folder");
	const folder = await open({ directory: true, multiple: false });
	if (!folder) return "";
	return folder;
}

export const useAppstore = defineStore("appstore", {
	state: () => ({
		menuKey: "",
		sourcePath: "",
		targetPath: "",
	}),
	actions: {
		async setSource() {
			console.log("set Source");
			this.sourcePath = await selectFolder();
		},
		async setTarget() {
			this.targetPath = await selectFolder();
		},
		setMenuKey(key: string) {
			this.menuKey = key;
		},
	},
});
