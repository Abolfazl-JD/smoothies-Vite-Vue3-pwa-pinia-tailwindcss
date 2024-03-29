<script lang="ts" setup>
import router from '@/router'
import { ref, onMounted } from 'vue'
// Components
import ToastAlert from '@/components/ToastAlert.vue'
// Modules
import AlertFeedback from '@/modules/alertFeedback'
import FormInput from '@/modules/inputFormFocus'
// Stores
import { appData } from '../stores/data'
// Types
import type { Smoothie } from '../types'

const smoothiesData = appData()
const { feedback, showFeedback } = AlertFeedback()

const { firstInputForm, focusForm }  = FormInput()
onMounted(() => {
    focusForm()
})

interface PropsType {
    title?: string,
    ingredients?: string[],
    id?: number,
    name? : string,
    editSmoothie : boolean 
}

const props = withDefaults(defineProps<PropsType>(), {
    title : '',
    id : Date.now(),
    name : '',
    ingredients : () => []
})

const smoothieTitle = ref(props.title)
const allIngredients = ref(props.ingredients)
const newIngredient = ref('')

const addIngredient = () => {
    if(newIngredient.value){
        allIngredients.value.push(newIngredient.value)
        newIngredient.value = ''
    }
    else{
        showFeedback("Please enter an ingridient")
    }
}

const addNewSmoothie = () => {
    /**
    * *check if there aren't any smoothies' title the same as the new smoothie title
    */
    if(smoothieTitle.value){
        if(uniqueSmoothieTitle()){
            newIngredient.value ? allIngredients.value.push(newIngredient.value) : null
            const newSmoothie = {
                title : smoothieTitle.value,
                ingredients : allIngredients.value,
                id : props.id,
                name : smoothieTitle.value.replace(/ /g,'_')
            }
            props.editSmoothie ? smoothiesData.editSmoothie(newSmoothie) :smoothiesData.addSmoothie(newSmoothie)
            router.push({name : 'smoothies'})
        }
        else showFeedback('This smoothie has already exist')
    }
    else showFeedback('Please enter the smoothie title')
}

const uniqueSmoothieTitle = () => {
    if(smoothiesData.smoothies.length){
        return smoothiesData.smoothies.every(smoothie =>
        // If we are editing our smoothie ,  
        // It doesn't matter if new smoothie title is the same as edited smoothie title 
        smoothie.id !== props.id ? 
        smoothie.title.toLowerCase().trim() !== smoothieTitle.value.toLowerCase().trim() : 
        true)
    }
    return true
}

</script>

<template>
    <transition name="feedback">
        <ToastAlert v-show="feedback">{{ feedback }}</ToastAlert>
    </transition>
    <div class="shadow shadow-gray-500 lg:w-1/3 md:w-1/2 sm:w-2/3 w-3/4 py-5 px-3 my-20 mx-auto">
        <h2 class="text-blue-800 text-2xl text-center font-medium">
            <slot name="title"></slot>
        </h2>
        <form class="pt-3">
            <div class="relative">
                <label for="title" class="text-gray-500 text-xs">Smoothie title:</label>
                <input
                ref="firstInputForm" 
                type="text" 
                name="title"
                v-model="smoothieTitle" 
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
                class="w-full pt-2 pb-1 text-lg border-b-2 border-solid border-gray-600 outline-none focus:border-teal-500">
                <svg
                @click="allIngredients.splice(index, 1)"
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 absolute right-2 text-gray-400 bottom-2 cursor-pointer" 
                viewBox="0 0 20 20" 
                fill="currentColor">
                    <path 
                    fill-rule="evenodd" 
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
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
            @click="addNewSmoothie" 
            class="py-2 px-4 bg-pink-600 text-white rounded text-sm shadow-md shadow-gray-400 hover:shadow-gray-500 transition ease-out duration-200">
                <slot name="submitButton"></slot>
            </button>
        </div>
    </div>
</template>