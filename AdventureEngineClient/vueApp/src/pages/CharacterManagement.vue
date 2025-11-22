<script setup lang="ts">
import type { Character, CharacterDomainCharacterStatInstance } from '../../../types/appTypes/appTypes.ts';
import CharacterStatDisplay from '../components/CharacterStatDisplay.vue';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts'
import type { UseQueryReturn } from '@pinia/colada';
import BasicStatIcon from '../components/BasicStatIcon.vue';
import { onMounted, watch, type UnwrapRef } from 'vue';
import { useRoute } from 'vue-router';

const state = composedAppInjectionContexts.store();
const route = useRoute();

const characterQuery = composedAppInjectionContexts.queries.useGetCharacterByIdQuery(parseInt(route.params.id as string)) as UseQueryReturn<Character>;

</script>

<template>
    <section>
		<p v-if="characterQuery.isLoading.value === true">
		Loading...
		</p>
		<div v-else>
			<div>
				Current Character: {{ characterQuery.data.value?.Attributes?.Title}}
			</div>
			<div v-bind:style="{display: 'flex', gap: '2rem'}">
				<div v-for="statInstance in characterQuery.data.value?.Relationships.OneToMany.Stats__CharacterDomainCharacterStatInstance">
					<CharacterStatDisplay :stat-instance="statInstance"/>
				</div>
			</div>
		</div>
	</section>
	
</template>

<style scoped>

</style>
