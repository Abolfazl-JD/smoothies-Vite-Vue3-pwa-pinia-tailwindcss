<script setup lang="ts">
import SmoothyItem from '../views/smoothiesView.vue'
import { appData } from '../stores/data'

const smoothiesData = appData()
</script>

<template>
  <main class="w-2/3 mt-20 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <!-- Smoothy item -->
    <SmoothyItem 
    v-for="smoothyItem of smoothiesData.smoothies"
    :key="smoothyItem.time"
    :smoothyItem="smoothyItem" />
  </main>
</template>
