<script setup lang="ts">
import { RouterView } from "vue-router"
</script>

<template>
  <header>
    <div class="wrapper w-full">
      <nav class="bg-blue-600 py-4 px-6 w-full relative">
        <h1 class="text-white text-3xl">𝕵𝖆𝖑𝖎𝖑 𝓢𝓶𝓸𝓸𝓽𝓱𝓲𝓮𝓼</h1>
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-12 w-12 p-3 text-white bg-pink-600 font-bold rounded-full absolute right-20" 
        fill="none" viewBox="0 0 24 24" 
        stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style></style>
