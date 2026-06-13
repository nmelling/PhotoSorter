<script setup lang="ts">
import { invoke } from "@tauri-apps/api/core";
import { ref } from "vue";
import BaseLayout from "./layouts/BaseLayout.vue";

const greetMsg = ref("");
const name = ref("");

async function greet() {
	// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
	greetMsg.value = await invoke("greet", { name: name.value });
}
</script>

<template>
    <BaseLayout>
        <main class="container">
            <div v-if="greetMsg" class="text-yellow-600">{{ greetMsg }}</div>
            <form @submit.prevent="greet">
                <input v-model="name" type="text" placeholder="Nom" />
                <NButton type="success" @click="greet">SALUTATIONS</NButton>
            </form>
        </main>
    </BaseLayout>
</template>

<style scoped>

</style>
