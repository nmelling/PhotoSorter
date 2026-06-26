<script setup lang="ts">
import { computed, ref, watch } from "vue";
import FolderSelector from "@/components/FolderSelector.vue";
import { type MENU_KEY_TYPE, SOURCE_KEY, TARGET_KEY } from "@/constants/menu";
import { useAppstore } from "@/stores/app.store";
import {
	renderIcon,
	SourceFolder,
	SourceFolderSelected,
	TargetFolder,
	TargetFolderSelected,
} from "../lib/icons";

const appstore = useAppstore();
const collapsed = ref(true);
const activeKey = ref<MENU_KEY_TYPE>(SOURCE_KEY);

function storeMenuKey() {
	appstore.setMenuKey(activeKey.value);
}

watch(() => activeKey.value, storeMenuKey, { immediate: true });

const menuOptions = computed(() => {
	return [
		{
			label: "Source",
			key: SOURCE_KEY,
			icon: renderIcon(
				appstore.$state.sourcePath ? SourceFolderSelected : SourceFolder
			),
		},
		{
			label: "Cible",
			key: TARGET_KEY,
			icon: renderIcon(
				appstore.$state.targetPath ? TargetFolderSelected : TargetFolder
			),
		},
	];
});
</script>

<template>
<div class="h-screen flex flex-col">
    <n-layout-header
      bordered
      class="h-16 flex items-center px-6 shrink-0 gap-2"
    >
      <div class="font-bold">
          PhotoSorter
      </div>
      <FolderSelector show-source show-target />
    </n-layout-header>

    <div class="flex-1 min-h-0">
      <n-layout has-sider class="h-full">
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          v-model:collapsed="collapsed"
          show-trigger
        >
          <n-menu
            v-model:value="activeKey"
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>

        <n-layout-content
          content-style="padding: 24px;"
          class="overflow-auto"
        >
          <slot />
        </n-layout-content>
      </n-layout>
    </div>

    <n-layout-footer
      bordered
      class="h-12 flex items-center justify-center shrink-0"
    >
      Footer
    </n-layout-footer>
  </div>
</template>

<style>

</style>
