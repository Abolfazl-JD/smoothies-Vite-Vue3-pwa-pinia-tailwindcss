<script lang="ts" setup>
// Components
import SmoothieForm from '@/components/SmoothieForm.vue'
</script>

<template>
    <SmoothieForm :edit-smoothie="false">
        <template #title>Add a new Smoothie recipe</template>
        <template #submitButton>ADD SMOOTHIE</template>
    </SmoothieForm>
</template>