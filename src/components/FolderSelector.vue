<script setup lang="ts">
import { NIcon } from "naive-ui";
import { storeToRefs } from "pinia";
import { renderIcon, SourceFolder, TargetFolder, Valid } from "../lib/icons";
import { useAppstore } from "../stores/app.store";

// Your script logic here
const appstore = useAppstore();
const { sourcePath, targetPath } = storeToRefs(appstore);
</script>

<template>
<div class="flex items-center gap-2">
    <div class="flex items-center gap-2">
        <NButton :render-icon="renderIcon(SourceFolder)" @click="appstore.setSource" >{{ sourcePath || 'Spécifier le dossier source' }}</NButton>
        <NIcon :component="Valid" :depth="sourcePath ? 1 : 5" />
    </div>
    <div class="flex items-center gap-2">
        <NButton :render-icon="renderIcon(TargetFolder)" @click="appstore.setTarget">{{ targetPath || 'Spécifier le dossier cible' }}</NButton>
        <NIcon :component="Valid" :depth="targetPath ? 1 : 5" />
    </div>
</div>
</template>

<style>

</style>
