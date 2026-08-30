<script setup lang="ts">
import type { CampaignEntityDomainEntityStatInstance, CampaignEntity } from '../../../types/appTypes/appTypes.ts';
import CharacterStatDisplay from '../components/CharacterStatDisplay.vue';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts'
import type { UseQueryReturn } from '@pinia/colada';
import BasicStatIcon from '../components/BasicStatIcon.vue';
import { onMounted, watch, type UnwrapRef } from 'vue';
import { useRoute } from 'vue-router';

const state = composedAppInjectionContexts.store();
const route = useRoute();

const characterQuery = composedAppInjectionContexts.queries.useGetCampaignEntityByIdQuery(parseInt(route.params.id as string)) as UseQueryReturn<CampaignEntity>;

</script>

<template>
	<p v-if="characterQuery.isLoading.value === true">
	Loading...
	</p>
	<div v-else class="restrictedWidthPage">
		<div class="characterTitle" v-text="characterQuery.data.value?.Attributes?.Title"/>
		<div v-bind:style="{display: 'flex', flexDirection: 'column', gap: '2rem'}">
			<div v-for="SubClassInstance in characterQuery.data.value?.Relationships.OneToMany.SubClasses__CampaignEntityDomainSubClassInstance">
				<div v-text="SubClassInstance.Relationships?.ManyToOne?.SubClass__DomainSubClass?.Attributes?.Title + ' ' + SubClassInstance.Relationships?.ManyToOne?.SubClass__DomainSubClass?.Relationships?.ManyToOne?.Class__DomainClass?.Attributes?.Title"/>
			</div>
		</div>
		<div v-bind:style="{display: 'flex', gap: '2rem'}">
			<div v-for="statInstance in characterQuery.data.value?.Relationships.OneToMany.Stats__CampaignEntityDomainEntityStatInstance">
				<div v-text="statInstance.Relationships.ManyToOne.Stat__DomainEntityStat?.Attributes.AbbreviatedTitle"/>
				<div v-text="statInstance.Attributes.Value"/>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.characterTitle {
		font-size: min(v-bind("state.reactiveThemeElement("--font-size-heading")") * 2, 5vw);
		font-family: v-bind("state.reactiveThemeElement("--font-family-headings")");
	}
</style>
