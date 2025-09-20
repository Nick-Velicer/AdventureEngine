<script setup lang="ts">
import { AppTypes, type CharacterDomainCharacterStatInstance } from '../../../types/appTypes/appTypes.ts';
import CharacterStatDisplay from '../components/CharacterStatDisplay.vue';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts.ts'
import { getCharacterbyId } from '../../../services/generated/CharacterService.ts';
import { useQuery } from '@pinia/colada';

</script>

<template>
    <section>
		<div v-for="table in [Object.keys(AppTypes)]" v-text="table">

		</div>
	</section>
	
</template>

<style scoped>

</style>
