<script setup lang="ts">
import { convertFileSrc } from "@tauri-apps/api/core";
import { NIcon, NImage } from "naive-ui";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import type { FileInfo } from "@/bindings/FileInfo";
import { ALLOWED_MIMETYPES } from "@/constants/file";
import {
	FolderIcon,
	ImgIcon,
	PdfIcon,
	renderIcon,
	UnknownFileIcon,
} from "@/lib/icons";
import { useAppstore } from "@/stores/app.store";

const appstore = useAppstore();
const { menuKey } = storeToRefs(appstore);

type Entry = FileInfo & {
	is_allowed: boolean;
	src?: string;
	icon?: ReturnType<typeof renderIcon>;
};

const entries = ref<Entry[]>([]);
async function setEntries() {
	const allEntries = await appstore.getDirEntries();
	entries.value = allEntries.map(entry => {
		const formatted: Entry = {
			...entry,
			is_allowed: ALLOWED_MIMETYPES.includes(entry.mime_type),
			icon: renderIcon(UnknownFileIcon),
		};
		if (formatted.is_allowed) formatted.src = convertFileSrc(formatted.path);
		if (entry.is_dir) formatted.icon = renderIcon(FolderIcon);
		else if (entry.mime_type === "application/pdf")
			formatted.icon = renderIcon(PdfIcon);
		return formatted;
	});
}

watch(menuKey, setEntries, { immediate: true });

// Listing des fichiers dispo
// Affichage dans une mini galerie pour navigation
// Affichage plein écran sur page
// Bouton pour déplacer/copier ?
// Configuration pour déplacer/copier au sein du footer et un seul bouton d'action pour éviter la confusion ?
</script>

<template>
  <div class="FolderExplorer">
      <div class="MiniGallery flex mb-2 border-b-2">
          <div
            v-for="(entry, index) in entries"
            :key="index"
            class="hover:cursor-pointer hover:scale-125"
          >
             <NImage v-if="entry.is_allowed" :src="entry.src" height="50" />
             <NIcon v-else :component="entry.icon" size="50" />
          </div>
      </div>
      <div class="ImgDisplayer"></div>
      {{ entries }}
  </div>
</template>

<style>

</style>
