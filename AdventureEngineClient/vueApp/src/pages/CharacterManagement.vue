<script setup lang="ts">
import type { CharacterDomainCharacterStatInstance } from '../../../types/appTypes/appTypes.ts';
import CharacterStatDisplay from '../components/CharacterStatDisplay.vue';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts'
import { getCharacterbyId } from '../../../services/generated/CharacterService.ts';
import { useQuery } from '@pinia/colada';

const state = composedAppInjectionContexts.store();
const characterQuery = composedAppInjectionContexts.queries.createGetCharactersQuery();

const individualCharacterQuery = composedAppInjectionContexts.queries.createGetCharacterByIdQuery(1);

const queryResult = individualCharacterQuery();

console.log(queryResult);
</script>

<template>
    <section>
		<p v-if="queryResult.isPending === true">
		Loading...
		</p>
		<div v-else>
			<button v-on:click="() => queryResult.refetch()">Test Query Refresh</button>
			<div>
				Current Character:
			</div>
			<div v-bind:style="{display: 'flex', gap: '2rem'}">
				<div v-bind:style="{display: 'flex', flexDirection: 'column', gap: '2rem'}">
					<div v-for="item in [queryResult.data.value]" v-text="item?.Id"></div>
				</div>
				<div v-bind:style="{display: 'flex', flexDirection: 'column', gap: '2rem'}">
					<div v-for="item in [queryResult.data.value]" v-text="item?.Attributes.Title"></div>
				</div>
				<div v-bind:style="{display: 'flex', flexDirection: 'column', gap: '2rem'}">
					<div v-for="item in [queryResult.data.value]" v-text="item?.Attributes.IsActive? 'Active' : 'Inactive'"></div>
				</div>
			</div>
			
		</div>
	</section>
	
</template>

<style scoped>

</style>
