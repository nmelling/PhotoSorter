<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import FolderSelector from "@/components/FolderSelector.vue";
import { type MENU_KEY_TYPE, SOURCE_KEY, TARGET_KEY } from "@/constants/menu";
import {
	renderIcon,
	SourceFolder,
	SourceFolderSelected,
	SwitchFolderIcon,
	TargetFolder,
	TargetFolderSelected,
} from "@/lib/icons";
import { useAppstore } from "@/stores/app.store";

const appstore = useAppstore();
const { targetPath, sourcePath, actionBehaviour } = storeToRefs(appstore);
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
      </div
      <!-- Affichage du chemin du dossier dans le header plutot avec possibilité de naviguer pour revenir en arriere -->
      <FolderSelector class="flex items-center gap-2" show-source show-target>
          <div>
              <NButton
                  type="primary"
                  :disabled="!targetPath && !sourcePath"
                  @click="appstore.switchFolders"
              >
                  <template #icon>
                      <SwitchFolderIcon />
                  </template>
              </NButton>
          </div>
      </FolderSelector>
    </n-layout-header>

    <div class="flex-1 min-h-0">
      <n-layout has-sider class="h-full">
        <n-layout-sider
          bordered
          :width="64"
        >
          <n-menu
            v-model:value="activeKey"
            collapsed
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>

        <n-layout-content
          class="overflow-auto p-2"
        >
          <slot />
        </n-layout-content>
      </n-layout>
    </div>

    <n-layout-footer
      bordered
      class="h-12 px-3 flex items-center shrink-0"
    >
        <n-switch :value="actionBehaviour === 'copy'" @update:value="appstore.toggleActionBehaviour">
            <template #checked>
                Copier
            </template>
            <template #unchecked>
            Déplacer
            </template>
        </n-switch>
    </n-layout-footer>
  </div>
</template>

<style>

</style>
