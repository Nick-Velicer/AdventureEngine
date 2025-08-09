<script setup lang="ts">

import { useQuery } from '@pinia/colada'
import { getCharacters } from '../../../services/generated/CharacterService'

const { data: characters, isPending } = useQuery({
  	key: () => ['testkey'],
  	query: () => getCharacters(),
});

</script>

<template>
	<section>
		<p v-if="isPending">
		Loading...
		</p>
		<div v-else>
			<div>
				Some results from our generated database and type schema:
			</div>
			<div v-bind:style="{display: 'flex', gap: '2rem'}">
				<div v-bind:style="{display: 'flex', flexDirection: 'column', gap: '2rem'}">
					<div v-for="item in characters" v-text="item.Id"></div>
				</div>
				<div v-bind:style="{display: 'flex', flexDirection: 'column', gap: '2rem'}">
					<div v-for="item in characters" v-text="item.Attributes.Title"></div>
				</div>
				<div v-bind:style="{display: 'flex', flexDirection: 'column', gap: '2rem'}">
					<div v-for="item in characters" v-text="item.Attributes.IsActive? 'Active' : 'Inactive'"></div>
				</div>
			</div>
			
		</div>
	</section>
</template>

<style scoped>

</style>
