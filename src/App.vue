<script setup lang="ts">
import { NIcon } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import FolderExplorer from "./components/FolderExplorer.vue";
import FolderSelector from "./components/FolderSelector.vue";
import { SOURCE_KEY, TARGET_KEY } from "./constants/menu";
import BaseLayout from "./layouts/BaseLayout.vue";
import { useAppstore } from "./stores/app.store";

const appstore = useAppstore();
const { sourcePath, targetPath, menuKey } = storeToRefs(appstore);

const isInit = computed(() => {
	const mapped = {
		[SOURCE_KEY]: sourcePath.value,
		[TARGET_KEY]: targetPath.value,
	};
	return menuKey.value && Boolean(mapped[menuKey.value]);
});
</script>

<template>
    <BaseLayout>
        <FolderExplorer v-if="isInit" />
        <FolderSelector v-else :show-source="menuKey === SOURCE_KEY" :show-target="menuKey === TARGET_KEY" />
    </BaseLayout>
</template>

<style scoped>

</style>
