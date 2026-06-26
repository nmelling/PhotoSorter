import { open } from "@tauri-apps/plugin-dialog";
import { defineStore } from "pinia";
import type { MENU_KEY_TYPE } from "@/constants/menu";

async function selectFolder(): Promise<string> {
	const folder = await open({ directory: true, multiple: false });
	if (!folder) return "";
	return folder;
}

export const useAppstore = defineStore("appstore", {
	state: () => ({
		menuKey: null as MENU_KEY_TYPE | null,
		sourcePath: "",
		targetPath: "",
	}),
	actions: {
		async setSource() {
			this.sourcePath = await selectFolder();
		},
		async setTarget() {
			this.targetPath = await selectFolder();
		},
		setMenuKey(key: MENU_KEY_TYPE) {
			this.menuKey = key;
		},
	},
});
