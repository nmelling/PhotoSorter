import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { defineStore } from "pinia";
import type { FileInfo } from "@/bindings/FileInfo";
import {
	type ACTION_BEHAVIOUR_TYPE,
	ACTION_BEHAVIOURS,
} from "@/constants/file";
import { type MENU_KEY_TYPE, SOURCE_KEY, TARGET_KEY } from "@/constants/menu";

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
		actionBehaviour: "copy" as ACTION_BEHAVIOUR_TYPE,
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
		toggleActionBehaviour() {
			if (ACTION_BEHAVIOURS.length > 2) throw new Error("UNKNOWN_ACTIONS");
			this.actionBehaviour = ACTION_BEHAVIOURS.filter(
				mode => mode !== this.actionBehaviour
			)[0];
		},
		async getDirEntries() {
			if (!this.menuKey) return [];

			const mapped = {
				[SOURCE_KEY]: this.sourcePath,
				[TARGET_KEY]: this.targetPath,
			};

			const entries = await invoke<FileInfo[]>("read_dir_details", {
				path: mapped[this.menuKey],
			});
			return entries;
		},
		async deleteFile(path: string) {
			console.log("FILE_DELETION", path);
		},
		async sortFile(path: string) {
			console.log("FILE_SORTING", path);
		},
	},
});
