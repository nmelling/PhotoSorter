<script setup lang="ts">
import { NIcon, useThemeVars } from "naive-ui";
import { storeToRefs } from "pinia";
import { computed, useSlots } from "vue";
import { renderIcon, SourceFolder, TargetFolder, Valid } from "@/lib/icons";
import { useAppstore } from "@/stores/app.store";

const props = defineProps<{
	showSource: boolean;
	showTarget: boolean;
}>();

const appstore = useAppstore();
const { sourcePath, targetPath } = storeToRefs(appstore);

const slots = useSlots();
const hasSlots = computed(() => {
	return !!slots.default && slots.default().length > 0;
});

const themeVars = useThemeVars();
</script>

<template>
<div>
    <div class="flex items-center gap-2">
        <div v-if="showSource" class="flex items-center gap-2">
            <NButton
                :render-icon="renderIcon(SourceFolder)"
                :type="sourcePath && 'success'"
                :tertiary="Boolean(sourcePath) || undefined"
                @click="appstore.setSource"
            >{{ sourcePath || 'Spécifier le dossier source' }}</NButton>
            <NIcon
                :component="Valid"
                :color="sourcePath && themeVars.successColor"
                :depth="sourcePath ? 1 : 5"
            />
        </div>
        <div v-if="showTarget" class="flex items-center gap-2">
            <NButton
                :render-icon="renderIcon(TargetFolder)"
                :type="targetPath && 'success'"
                :tertiary="Boolean(targetPath) || undefined"
                @click="appstore.setTarget"
            >{{ targetPath || 'Spécifier le dossier cible' }}</NButton>
            <NIcon
                :component="Valid"
                :color="targetPath && themeVars.successColor"
                :depth="targetPath ? 1 : 5"
            />
        </div>
    </div>
    <div v-if="hasSlots">
        <slot />
    </div>
</div>
</template>

<style>

</style>
