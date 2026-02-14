<script setup lang="ts">
import type { UseQueryReturn } from '@pinia/colada';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts.ts';
import type { Campaign, Character } from '../../../types/appTypes/appTypes.ts';
import { useRoute } from 'vue-router';
import type { FilterCollection } from '../../../services/utils.ts';
import { NButton } from 'naive-ui';
import { getCharacters } from '../../../services/generated/CharacterService.ts';
import Loader from '../components/Loader.vue';
import DynamicDataList from '../components/DynamicDataList/DynamicDataList.vue';

const state = composedAppInjectionContexts.store();
const route = useRoute();

const campaignId = typeof route.params.id === 'string'? parseInt(route.params.id as string) : undefined;
//Filter and get characters for campaign

const filters: FilterCollection<Campaign> = campaignId == undefined? [] :
	[
		{
			field: "",
			operator: "eq",
			filterValue: campaignId?.toString()
		}
	];

const characterNavLink = (characterId: number ) => "/CharacterManagement/" + characterId.toString() 

</script>

<template>
	<DynamicDataList v-if="typeof campaignId != 'number'" table="Campaign"/>
	<div v-else>
		<DynamicDataList table="Character"/>
	</div>
	
</template>

<style scoped>

</style>
