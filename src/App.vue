<script setup lang="ts">
import { NIcon } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import FolderExplorer from "./components/FolderExplorer.vue";
import BaseLayout from "./layouts/BaseLayout.vue";
import { renderIcon, SourceFolder, TargetFolder, Valid } from "./lib/icons";
import { useAppstore } from "./stores/app.store";

const appstore = useAppstore();
const { sourcePath, targetPath } = storeToRefs(appstore);

const isInit = computed(() => {
	return sourcePath.value && targetPath.value;
});
</script>

<template>
    <BaseLayout>
        <FolderExplorer v-if="isInit" />
        <div>
            <div>
                <NButton :render-icon="renderIcon(SourceFolder)">Spécifier le dossier source</NButton>
                <NIcon :component="Valid" :depth="sourcePath ? 1 : 5" />
            </div>
            <div>
                <NButton :render-icon="renderIcon(TargetFolder)">Spécifier le dossier cible</NButton>
                <NIcon :component="Valid" :depth="targetPath ? 1 : 5" />
            </div>
        </div>
    </BaseLayout>
</template>

<style scoped>

</style>
