<script setup lang="ts">
import type { Character, CharacterDomainCharacterStatInstance } from '../../../types/appTypes/appTypes.ts';
import CharacterStatDisplay from '../components/CharacterStatDisplay.vue';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts'
import type { UseQueryReturn } from '@pinia/colada';
import BasicStatIcon from '../components/BasicStatIcon.vue';

const state = composedAppInjectionContexts.store();
const characterQuery = composedAppInjectionContexts.queries.useGetCharacterByIdQuery(1) as UseQueryReturn<Character>;
console.log(characterQuery.data.value?.Relationships.OneToMany);

const stats = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma"
]

</script>

<template>
    <section>
		<p v-if="characterQuery.isPending === true">
		Loading...
		</p>
		<div v-else>
			<button v-on:click="() => characterQuery.refetch()">Test Query Refresh</button>
			<div>
				Current Character: {{ characterQuery.data.value?.Attributes.Title}}
			</div>
			<div v-bind:style="{display: 'flex', gap: '2rem'}">
				<div v-for="item, index in characterQuery.data.value?.Relationships.OneToMany.Stats__CharacterDomainCharacterStatInstance">
					<BasicStatIcon :basic-stat-name="stats[index]"/>
					<div v-text="item?.Attributes?.Title"/>
				</div>
			</div>
			
		</div>
	</section>
	
</template>

<style scoped>

</style>
