<script setup lang="ts">
import {
	Folder28Regular as SourceFolder,
	// Folder28Filled as SourceFolderSelected,
	FolderAdd24Regular as TargetFolder,
	// FolderAdd24Filled as TargetFolderSelected,
} from "@vicons/fluent";
import { NIcon } from "naive-ui";
import { type Component, computed, h, ref } from "vue";

const collapsed = ref(true);

function renderIcon(icon: Component) {
	return () =>
		h(NIcon, null, {
			default: () => h(icon),
		});
}

const menuOptions = computed(() => {
	return [
		{
			label: "Source",
			key: "source",
			icon: renderIcon(SourceFolder),
		},
		{
			label: "Cible",
			key: "target",
			icon: renderIcon(TargetFolder),
		},
	];
});
</script>

<template>
<div class="h-screen flex flex-col">
    <n-layout-header
      bordered
      class="h-16 flex items-center px-6 shrink-0"
    >
      <div class="font-bold">
          PhotoSorter
      </div>
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
