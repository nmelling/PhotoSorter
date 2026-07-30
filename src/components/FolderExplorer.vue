<script setup lang="ts">
import { convertFileSrc } from "@tauri-apps/api/core";
import { NIcon } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { FileInfo } from "@/bindings/FileInfo";
import { ALLOWED_MIMETYPES } from "@/constants/file";
import {
	DeleteIcon,
	FolderIcon,
	PdfIcon,
	renderIcon,
	SortIcon,
	UnknownFileIcon,
} from "@/lib/icons";
import { useAppstore } from "@/stores/app.store";

const appstore = useAppstore();
const { menuKey, sourcePath, targetPath } = storeToRefs(appstore);

type Entry = FileInfo & {
	is_allowed: boolean;
	src?: string;
	icon?: ReturnType<typeof renderIcon>;
};

const entries = ref<Entry[]>([]);
const thumbs = ref<HTMLElement[]>([]);
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
watch(
	selectedIdx,
	newIdx => {
		const thumb = thumbs.value[newIdx];
		if (!thumb) return;
		thumb.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		});
	},
	{ immediate: true }
);

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

const loading = ref(false);
async function onClickDelete(path: string) {
	if (loading.value) return;
	loading.value = true;
	try {
		await appstore.deleteFile(path);
	} catch (err) {
		console.error(err);
	}
	loading.value = false;
}

async function onClickSort(path: string) {
	if (loading.value) return;
	loading.value = true;
	try {
		await appstore.sortFile(path);
	} catch (err) {
		console.error(err);
	}
	loading.value = false;
}
// Bouton pour déplacer/copier ?
// Configuration pour déplacer/copier au sein du footer et un seul bouton d'action pour éviter la confusion ?
// Double clic sur icone dossier permet de naviguer au sein du dossier
// Affichage du chemin du dossier dans le header plutot avec possibilité de naviguer pour revenir en arriere
</script>

<template>
<div class="FolderExplorer flex flex-col h-screen">
  <div
    class="MiniGallery sticky top-0 z-10 flex flex-nowrap gap-3 overflow-x-auto scrollbar-hide p-2 border-b bg-white shrink-0"
  >
    <div
      v-for="(entry, index) in entries"
      :key="index"
      :ref="el => { if (el) thumbs[index] = el as HTMLElement }"
      class="rounded-xl hover:cursor-pointer hover:scale-105 transition"
      :class="{ 'border-2 border-red-600': selectedIdx === index }"
      @click="onClickSelect(index)"
    >
      <img
        v-if="entry.is_allowed"
        :src="entry.src"
        class="max-w-25 min-w-25 max-h-25 min-h-25 object-cover rounded-xl"
      />

      <NIcon
        v-else
        :component="entry.icon"
        size="80"
        class="max-w-25 min-w-25 max-h-25 min-h-25 flex items-center justify-center"
      />
    </div>
  </div>

  <div class="ImgDisplayer relative flex-1 flex flex-col overflow-hidden">
    <div class="absolute top-0 right-0 flex w-full justify-between px-3 py-2 gap-3">
        <NButton
            type="error"
            :loading="loading"
            @click="onClickDelete"
        >
            <template #icon>
                <NIcon>
                    <DeleteIcon />
                </NIcon>
            </template>
        </NButton>
        <NButton
            type="primary"
            :disabled="menuKey !== 'source' || !targetPath"
            :loading="loading"
            @click="onClickSort"
        >
            <template #icon>
                <NIcon>
                    <SortIcon />
                </NIcon>
            </template>
        </NButton>
    </div>
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
