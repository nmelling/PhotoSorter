<script setup lang="ts">
import type { DirEntry } from "@tauri-apps/plugin-fs";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useAppstore } from "@/stores/app.store";

const appstore = useAppstore();
const { menuKey } = storeToRefs(appstore);

const entries = ref<DirEntry[]>([]);
async function setEntries() {
	entries.value = await appstore.getDirEntries();
}
watch(menuKey, setEntries, { immediate: true });

// Listing des fichiers dispo
// Affichage dans une mini galerie pour navigation
// Affichage plein écran sur page
// Bouton pour déplacer/copier ?
// Configuration pour déplacer/copier au sein du footer et un seul bouton d'action pour éviter la confusion ?
</script>

<template>
  <div class="container">
      {{ entries }}
  </div>
</template>

<style>

</style>
