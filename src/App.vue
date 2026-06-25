<script setup lang="ts">
import { NIcon } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import FolderExplorer from "./components/FolderExplorer.vue";
import FolderSelector from "./components/FolderSelector.vue";
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
        <FolderSelector v-else />
    </BaseLayout>
</template>

<style scoped>

</style>
