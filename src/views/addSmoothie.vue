<script lang="ts" setup>
import { reactive, ref } from 'vue'

import {appData} from '../stores/data'
const smoothiesData = appData()

const newSmoothieTitle = ref('')
const newIngredient = ref('')
const allIngredients = ref<string[]>([])

const addIngredient = () => {
    if(newIngredient.value){
        allIngredients.value.push(newIngredient.value)
        newIngredient.value = ''
    }
    else{
        console.log('feedback')
    }
}
const addNewSmoothie = () => {
    if(newSmoothieTitle.value){
        newIngredient.value ? allIngredients.value.push(newIngredient.value) : null
        const newSmoothie = {
            title : newSmoothieTitle.value,
            ingredients : allIngredients.value,
            time : Date.now()
        }
        smoothiesData.addSmoothie(newSmoothie)
    }
    else console.log('feedback')
}

</script>

<template>
    <div class="shadow shadow-gray-500 w-1/3 py-5 px-3 mt-10 mx-auto">
        <h2 class="text-blue-800 text-2xl text-center">Add a new smoothie recipe</h2>
        <form class="pt-3">
            <div class="relative">
                <label for="title" class="text-gray-500 text-xs">Smoothie title:</label>
                <input 
                type="text" 
                name="title"
                v-model="newSmoothieTitle" 
                class="w-full pt-2 pb-1 text-lg border-b-2 border-solid border-gray-600 outline-none focus:border-teal-500">
            </div>
            <div 
            v-for="(ingredient, index) in allIngredients"
            :key="index"
            class="mt-7 relative">
                <label :for="`ingredient-${index}`" class="text-gray-500 text-xs">ingredient: </label>
                <input 
                type="text"
                :name="`ingredient-${index}`"
                v-model="allIngredients[index]" 
                class="w-full pt-2 pb-1 text-lg border-b-2 border-solid border-gray-600 outline-none focus:border-teal-700">
            </div>
            <div class="mt-7 relative">
                <label for="newIngredient" class="text-gray-500 text-xs">Add an ingredient: </label>
                <span  class="text-gray-500 text-xs hidden md:inline">( press enter to add )</span>
                <input 
                type="text"
                @keyup.enter="addIngredient" 
                name="newIngredient"
                v-model="newIngredient" 
                class="w-full pt-2 pb-1 text-lg border-b-2 border-solid border-gray-600 outline-none focus:border-teal-700">
                <svg
                @click="addIngredient"
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 absolute right-2 text-black bottom-2 cursor-pointer" 
                fill="none" viewBox="0 0 24 24" 
                stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </div>
        </form>
        <div class="form-control mt-5 w-full text-center">
                <button
                @click="addNewSmoothie" 
                class="py-2 px-4 bg-pink-600 text-white rounded text-sm shadow-md shadow-gray-400 hover:shadow-gray-500 transition ease-out duration-200">ADD SMOOTHIE</button>
        </div>
    </div>
</template>