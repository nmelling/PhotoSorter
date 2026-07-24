import {
	BookQuestionMark20Filled,
	CheckmarkCircle32Regular,
	CopyArrowRight16Filled,
	Delete28Filled,
	DocumentPdf24Filled,
	Folder28Filled,
	Folder28Regular,
	Folder32Filled,
	FolderAdd24Filled,
	FolderAdd24Regular,
	Image20Regular,
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
export const PdfIcon = DocumentPdf24Filled;
export const FolderIcon = Folder32Filled;
export const ImgIcon = Image20Regular;
export const UnknownFileIcon = BookQuestionMark20Filled;
export const DeleteIcon = Delete28Filled;
export const SortIcon = CopyArrowRight16Filled;
