<script setup lang="ts">
import { AppTypes, type CharacterDomainCharacterStatInstance } from '../../../types/appTypes/appTypes.ts';
import { NDropdown} from 'naive-ui';
import CharacterStatDisplay from '../components/CharacterStatDisplay.vue';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts.ts'
import { getCharacterbyId } from '../../../services/generated/CharacterService.ts';
import { useQuery } from '@pinia/colada';

import { useMessage } from 'naive-ui'
import DynamicDataTable from '../components/DynamicDataTable.vue';

const state = composedAppInjectionContexts.store();
console.log(state.activeTableView);

const options = Object.keys(AppTypes).map(table => ({
	key: table,
	label: table
}))

</script>

<template>
    <section>
		<n-dropdown trigger="hover" :options="options" @select="(table) => state.setActiveTableView(table)">
			<n-button>Select Table</n-button>
		</n-dropdown>
		<DynamicDataTable v-if="state.activeTableView != undefined" :table="state.activeTableView"/>
	</section>
	
</template>

<style scoped>

</style>
