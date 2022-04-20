<script setup lang="ts">
import SmoothieItem from '../components/SmoothieItem.vue'
import { appData } from '../stores/data'

const smoothiesData = appData()
</script>

<template>
  <transition name="switch" mode="out-in">
    <transition-group
    v-if="smoothiesData.smoothies.length"
    tag="main"
    name="list" 
    class="xl:w-2/3 md:w-5/6 sm:w-full sm:px-5 xs:w-2/3 w-3/4 mt-20 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 sm:gap-8 relative">
      <!-- Smoothie item -->
      <SmoothieItem 
      v-for="smoothie of smoothiesData.smoothies"
      :key="smoothie.id"
      :smoothie="smoothie" />

    </transition-group>
    <h2 v-else class="font-bold text-gray-800 text-xl text-center mt-16">whooo no smoothie to drink!</h2>
  </transition>
</template>

<style>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.switch-enter-from,
.switch-leave-to{
  opacity : 0;
  transform: translateY(30px);
}

.switch-enter-active,
.switch-leave-active{
  transition: all 0.3s ease;
}
</style>
