import {
	CheckmarkCircle32Regular,
	Folder28Filled,
	Folder28Regular,
	FolderAdd24Filled,
	FolderAdd24Regular,
} from "@vicons/fluent";
import { NIcon } from "naive-ui";
import { type Component, h } from "vue";

export function renderIcon(icon: Component) {
	return () =>
		h(NIcon, null, {
			default: () => h(icon),
		});
}

export const SourceFolder = Folder28Regular;
export const SourceFolderSelected = Folder28Filled;
export const TargetFolder = FolderAdd24Regular;
export const TargetFolderSelected = FolderAdd24Filled;
export const Valid = CheckmarkCircle32Regular;
