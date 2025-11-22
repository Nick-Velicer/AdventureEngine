<script setup lang="ts">
import type { UseQueryReturn } from '@pinia/colada';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts.ts';
import type { Campaign, Character } from '../../../types/appTypes/appTypes.ts';
import { useRoute } from 'vue-router';
import type { FilterAST } from '../../../services/filterUtils.ts';
import { NButton } from 'naive-ui';
import { getCharacters } from '../../../services/generated/CharacterService.ts';

const state = composedAppInjectionContexts.store();
const route = useRoute();

const campaignId = parseInt(route.params.id as string);
//Filter and get characters for campaign
const characterQuery = composedAppInjectionContexts.queries.useGetCharactersQuery({
	"AND": [
		{
			field: "Campaign__Campaign",
			operator: "==",
			filterValue: campaignId.toString()
		},
		{
			field: "IsActive",
			operator: "==",
			filterValue: "1"
		}
	]
} as FilterAST<Character>) as UseQueryReturn<Character>;

</script>

<template>
    <section>
		<n-button v-on:click="() => characterQuery.refetch()">Test Query Refresh</n-button>
		<p v-if="characterQuery.isLoading.value === true">
		Loading...
		</p>
		<div v-else>
			<div>
				Current Campaign Id: {{ campaignId}}
			</div>
			<div v-bind:style="{display: 'flex', gap: '2rem'}">
				<div v-for="character in characterQuery.data.value" v-text="character.Title"/>
			</div>
		</div>
	</section>
	
</template>

<style scoped>

</style>
