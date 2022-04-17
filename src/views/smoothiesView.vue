<script setup lang="ts">
import SmoothieItem from '../components/SmoothieItem.vue'
import { appData } from '../stores/data'

const smoothiesData = appData()
</script>

<template>
  <main class="xl:w-2/3 md:w-5/6 sm:w-full sm:px-5 xs:w-2/3 w-3/4 mt-20 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 sm:gap-8">
    <!-- Smoothie item -->
    <SmoothieItem 
    v-for="smoothie of smoothiesData.smoothies"
    :key="smoothie.id"
    :smoothie="smoothie" />
  </main>
</template>
