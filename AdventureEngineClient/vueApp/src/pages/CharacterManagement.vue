<script setup lang="ts">
import type { CharacterDomainCharacterStatInstance } from '../../../types/appTypes/appTypes.ts';
import CharacterStatDisplay from '../components/CharacterStatDisplay.vue';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts'
import { getCharacterbyId } from '../../../services/generated/CharacterService.ts';
import { useQuery } from '@pinia/colada';

const state = composedAppInjectionContexts.store();
const characterQuery = composedAppInjectionContexts.queries.queryCharacters();

console.log(characterQuery.state.value);
</script>

<template>
    <div>
        on character management
    </div>
	
</template>

<style scoped>

</style>
