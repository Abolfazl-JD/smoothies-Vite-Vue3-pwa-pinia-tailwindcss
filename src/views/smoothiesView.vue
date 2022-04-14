<script setup lang="ts">
import SmoothieItem from '../components/SmoothieItem.vue'
import { appData } from '../stores/data'

const smoothiesData = appData()
</script>

<template>
  <main class="w-2/3 mt-20 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
    <!-- Smoothie item -->
    <SmoothieItem 
    v-for="smoothie of smoothiesData.smoothies"
    :key="smoothie.id"
    :smoothie="smoothie" />
  </main>
</template>
