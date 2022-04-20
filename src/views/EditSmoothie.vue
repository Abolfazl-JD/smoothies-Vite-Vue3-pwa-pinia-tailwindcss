<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import router from '../router'
import { useRoute } from 'vue-router'
import type { Smoothie } from '../types'
import { indexedDb } from '../stores/indexedDB'
import { appData } from '../stores/data'
import ToastAlert from '@/components/ToastAlert.vue'

const databaseStore = indexedDb()
const smoothiesData = appData()

const route = useRoute();  
const drinkName = route.params.id

const firstInputForm = ref<HTMLInputElement | null>(null)

const editedSmoothie = ref<Smoothie | null>()
onMounted(async() => {
    editedSmoothie.value = await databaseStore.getSingleSmoothie((drinkName as string))
    setTimeout(() => {
        firstInputForm.value?.focus()
    }, 10)
})

const newIngredient = ref('')
const addIngredient = () => {
    if(newIngredient.value){
        editedSmoothie.value?.ingredients.push(newIngredient.value)
        newIngredient.value = ''
    }
    else{
        showFeedback("Please enter an ingridient")
    }
}

const editSmoothie = () => {
    /**
    * *check if there aren't any smoothies' title the same as the new smoothie title
    */
    if(editedSmoothie.value?.title){
        if(uniqueSmoothieTitle()){
            newIngredient.value ? editedSmoothie.value.ingredients.push(newIngredient.value) : null
            const newSmoothie = {
                title : editedSmoothie.value.title,
                ingredients : editedSmoothie.value.ingredients,
                id : editedSmoothie.value.id,
                name : editedSmoothie.value.title.replace(/ /g,'_')
            }
            smoothiesData.editSmoothie(newSmoothie)
            router.push({name : 'smoothies'})    
        }
        else showFeedback(`There is already a smoothie with ${editedSmoothie.value.title} title`)
        
    }
    else showFeedback('Please enter the smoothie title')
}

const uniqueSmoothieTitle = () => {
    if(smoothiesData.smoothies.length){
        return smoothiesData.smoothies.every(smoothie => 
        smoothie.id !== editedSmoothie.value?.id ? 
        smoothie.title.toLowerCase().trim() !== editedSmoothie.value?.title.toLowerCase().trim() : 
        true)
    }
    return true
}


const feedback = ref('')
const showFeedback = (alertText : string) => {
    feedback.value = alertText
    setTimeout(() => {
        feedback.value = ''
    }, 3000);
}
</script>

<template>
    <transition name="feedback">
        <ToastAlert v-show="feedback">{{feedback}}</ToastAlert>
    </transition>
    <div 
    v-if="editedSmoothie"
    class="shadow shadow-gray-500 lg:w-1/3 md:w-1/2 sm:w-2/3 w-3/4 py-5 px-3 my-20 mx-auto">
        <h2 class="text-blue-800 text-2xl text-center font-medium">Edit {{ editedSmoothie.title }} smoothie recipe</h2>
        <form class="pt-3">
            <div class="relative">
                <label for="title" class="text-gray-500 text-xs">Smoothie title:</label>
                <input
                autofocus
                ref="firstInputForm" 
                type="text" 
                name="title"
                v-model="editedSmoothie.title" 
                class="w-full pt-2 pb-1 text-lg border-b-2 border-solid border-gray-600 outline-none focus:border-teal-500">
            </div>
            <div 
            v-for="(ingredient, index) in editedSmoothie.ingredients"
            :key="index"
            class="mt-7 relative">
                <label :for="`ingredient-${index}`" class="text-gray-500 text-xs">ingredient: </label>
                <input 
                type="text"
                :name="`ingredient-${index}`"
                v-model="editedSmoothie.ingredients[index]" 
                class="w-full pt-2 pb-1 text-lg border-b-2 border-solid border-gray-600 outline-none focus:border-teal-500">
            </div>
            <div class="mt-7 relative">
                <label for="newIngredient" class="text-gray-500 text-xs">Add an ingredient: </label>
                <span  class="text-gray-500 text-xs hidden md:inline">( press enter to add )</span>
                <input 
                type="text"
                @keyup.enter="addIngredient" 
                name="newIngredient"
                v-model="newIngredient" 
                class="w-full pt-2 pb-1 text-lg border-b-2 border-solid border-gray-600 outline-none focus:border-teal-500">
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
                @click="editSmoothie" 
                class="py-2 px-4 bg-pink-600 text-white rounded text-sm shadow-md shadow-gray-400 hover:shadow-gray-500 transition ease-out duration-200">EDIT SMOOTHIE</button>
        </div>
    </div>
</template>