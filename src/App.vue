<script setup lang="ts">
import { onMounted } from "vue"
import { RouterView, RouterLink } from "vue-router"
import { appData } from './stores/data'
import ReloadPwa from "./components/ReloadPwa.vue"
const smoothiesData = appData()

onMounted(async () => {
  await smoothiesData.getSmoothiesData()
})
</script>

<template>
  <ReloadPwa />
  <header>
    <div class="wrapper w-full">
      <nav class="bg-blue-600 py-5 md:py-4 px-3 md:px-6 w-full relative">
        <router-link :to="{name : 'smoothies'}">
          <h1 class="text-white text-3xl">𝕵𝖆𝖑𝖎𝖑 𝓢𝓶𝓸𝓸𝓽𝓱𝓲𝓮𝓼</h1>
        </router-link>
        <router-link :to="{name : 'add-smoothie'}">
          <svg
          xmlns="http://www.w3.org/2000/svg" 
          class="h-12 w-12 p-3 text-white bg-pink-600 font-bold rounded-full absolute right-2 md:right-10" 
          fill="none" viewBox="0 0 24 24" 
          stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </router-link>
        
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style></style>
