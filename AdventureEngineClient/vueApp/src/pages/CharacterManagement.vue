<script setup lang="ts">
import type { CharacterDomainCharacterStatInstance } from '../../../types/appTypes/appTypes.ts';
import { useGlobalQueries, useGlobalStore } from '../../../vueApp/src/main.ts'
import CharacterStatDisplay from '../components/CharacterStatDisplay.vue';

const state = useGlobalStore();
const { data: characters, isPending } = useGlobalQueries.queryCharacters();
</script>

<template>
    <div>
        on character management
    </div>
	
</template>

<style scoped>

</style>
