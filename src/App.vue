<script setup lang="ts">
import { invoke } from "@tauri-apps/api/core";
import { ref } from "vue";

const greetMsg = ref("");
const name = ref("");

async function greet() {
	// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
	greetMsg.value = await invoke("greet", { name: name.value });
}
</script>

<template>
  <main class="container">
      <div v-if="greetMsg" class="text-yellow-600">{{ greetMsg }}</div>
      <form @submit.prevent="greet">
          <input v-model="name" type="text" placeholder="Nom" />
           <NButton type="success" @click="greet">SALUTATIONS</NButton>
      </form>
  </main>
</template>

<style scoped>

</style>
