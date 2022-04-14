<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();  
const id = route.params.id
</script>

<template>
    <div>
        <h1>Edit smoothies with the name of {{ id }}</h1>
    </div>
</template>