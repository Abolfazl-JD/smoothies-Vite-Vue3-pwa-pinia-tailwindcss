<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Types
import type { Smoothie } from '../types'
// Stores
import { indexedDb } from '../stores/indexedDB'
// Components
import SmoothieForm from '@/components/SmoothieForm.vue'

const databaseStore = indexedDb()

const route = useRoute()
const drinkName = route.params.name


const editedSmoothie = ref<Smoothie | null>()
onMounted(async() => {
    editedSmoothie.value = await databaseStore.getSingleSmoothie((drinkName as string))
})
</script>

<template>
    <SmoothieForm
    v-if="editedSmoothie"
    v-bind="editedSmoothie"
    :edit-smoothie="true">
        <template #title>Edit smoothie recipe</template>
        <template #submitButton>Edit SMOOTHIE</template>
    </SmoothieForm>
</template>