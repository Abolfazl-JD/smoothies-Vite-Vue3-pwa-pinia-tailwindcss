<script lang="ts" setup>
import type {Smoothie} from '../types'

const props = defineProps<{
    smoothie : Smoothie
}>()
</script>

<template>
    <div class="relative p-5 pt-6 shadow shadow-gray-400">
        <!-- Delete icon -->
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-5 w-5 absolute top-1 right-1 text-gray-500 cursor-pointer" 
        viewBox="0 0 20 20" 
        fill="currentColor">
        <path 
        fill-rule="evenodd" 
        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <h3 class="text-center text-3xl tracking-wider text-blue-800">{{ smoothie.title }}</h3>
        <div class="flex flex-wrap gap-2 py-7 ">
            <span 
            v-for="ingredient of smoothie.ingredients" 
            class="text-xs text-gray-500 rounded-full font-bold bg-gray-300 py-2 px-3">{{ ingredient }}</span>
        </div>
        <!-- Edit icon -->
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-12 w-12 p-3 text-white bg-pink-600 font-bold rounded-full absolute right-10 cursor-pointer" 
        viewBox="0 0 20 20" 
        fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
    </div>
</template>