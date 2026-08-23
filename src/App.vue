<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import FolderExplorer from "@/components/FolderExplorer.vue";
import FolderSelector from "@/components/FolderSelector.vue";
import { SOURCE_KEY, TARGET_KEY } from "@/constants/menu";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { useAppstore } from "@/stores/app.store";

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
        <div class="w-full">
            <FolderExplorer v-if="isInit" />
            <div v-else class="flex justify-center">
                <FolderSelector
                    :show-source="menuKey === SOURCE_KEY"
                    :show-target="menuKey === TARGET_KEY"
                >
                    <div class="font-bold mt-2">Veuillez sélectionner un dossier pour commencer</div>
                </FolderSelector>
            </div>
        </div>
    </BaseLayout>
</template>

<style scoped>

</style>
