<script setup lang="ts">
import type { UseQueryReturn } from '@pinia/colada';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts.ts';
import type { Campaign, Character } from '../../../types/appTypes/appTypes.ts';
import { useRoute } from 'vue-router';
import type { FilterCollection } from '../../../services/filterUtils.ts';
import { NButton } from 'naive-ui';
import { getCharacters } from '../../../services/generated/CharacterService.ts';

const state = composedAppInjectionContexts.store();
const route = useRoute();

const campaignId = parseInt(route.params.id as string);
//Filter and get characters for campaign
const characterQuery = composedAppInjectionContexts.queries.useGetCharactersQuery([
	{
		field: "Campaign__Campaign",
		operator: "eq",
		filterValue: campaignId.toString()
	}
]) as UseQueryReturn<Character>;

const characterNavLink = (characterId: number ) => "/CharacterManagement/" + characterId.toString() 

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
			<RouterLink v-for="character in characterQuery.data.value" :to="characterNavLink(character.Id!)">
				{{ character.Attributes.Title }}
			</RouterLink>
		</div>
	</section>
	
</template>

<style scoped>

</style>
