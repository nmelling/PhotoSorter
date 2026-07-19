<script setup lang="ts">
import { convertFileSrc } from "@tauri-apps/api/core";
import { NIcon, NImage } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { FileInfo } from "@/bindings/FileInfo";
import { ALLOWED_MIMETYPES } from "@/constants/file";
import { FolderIcon, PdfIcon, renderIcon, UnknownFileIcon } from "@/lib/icons";
import { useAppstore } from "@/stores/app.store";

const appstore = useAppstore();
const { menuKey, sourcePath, targetPath } = storeToRefs(appstore);

type Entry = FileInfo & {
	is_allowed: boolean;
	src?: string;
	icon?: ReturnType<typeof renderIcon>;
};

const entries = ref<Entry[]>([]);
const selectedIdx = ref(0);

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
	selectedIdx.value = 0;
}

watch(menuKey, setEntries, { immediate: true });
watch(sourcePath, setEntries, { immediate: true });
watch(targetPath, setEntries, { immediate: true });

function onClickSelect(index: number): void {
	selectedIdx.value = index;
}
const selectedEntry = computed(() => entries.value[selectedIdx.value]);

function onKeydownSelect(e: KeyboardEvent) {
	const entriesLength = entries.value.length;
	if (entriesLength === 0) return;
	if (e.code === "ArrowRight")
		selectedIdx.value = (selectedIdx.value + 1) % entriesLength;
	else if (e.code === "ArrowLeft")
		selectedIdx.value = (selectedIdx.value - 1 + entriesLength) % entriesLength;
}

onMounted(() => {
	window.addEventListener("keydown", onKeydownSelect);
});
onBeforeUnmount(() => {
	window.removeEventListener("keydown", onKeydownSelect);
});

// Listing des fichiers dispo
// Affichage dans une mini galerie pour navigation
// Affichage plein écran sur page
// Bouton pour déplacer/copier ?
// Configuration pour déplacer/copier au sein du footer et un seul bouton d'action pour éviter la confusion ?
// Double clic sur icone dossier permet de naviguer au sein du dossier
// Affichage du chemin du dossier dans le header plutot avec possibilité de naviguer pour revenir en arriere
</script>

<template>
<div class="FolderExplorer flex flex-col h-screen">
  <div
    class="MiniGallery sticky top-0 z-10 flex gap-3 overflow-x-auto scrollbar-hide p-2 border-b bg-white shrink-0"
  >
    <div
      v-for="(entry, index) in entries"
      :key="index"
      class="rounded-xl hover:cursor-pointer hover:scale-105 transition"
      :class="{ 'border-2 border-red-600': selectedIdx === index }"
      @click="onClickSelect(index)"
    >
      <img
        v-if="entry.is_allowed"
        :src="entry.src"
        class="w-50 h-20 object-cover rounded-xl"
      />

      <NIcon
        v-else
        :component="entry.icon"
        size="80"
        class="w-50 h-20 flex items-center justify-center"
      />
    </div>
  </div>

  <div class="ImgDisplayer relative flex-1 flex flex-col overflow-hidden">
    <div
      class="flex-1 flex items-center justify-center bg-neutral-900 overflow-hidden"
    >
      <img
        v-if="selectedEntry?.is_allowed"
        :src="selectedEntry.src"
        class="max-w-full max-h-full object-contain"
      />

      <NIcon
        v-else
        :component="selectedEntry?.icon"
        size="200"
      />
    </div>

    <div class="legend absolute bottom-0 z-10 bg-neutral-50 opacity-60 w-full p-2 text-center border-t">
      {{ selectedEntry?.name }}
    </div>
  </div>
</div>
</template>

<style>

</style>
