<script setup lang="ts">

import { useQuery } from '@pinia/colada'
import { getCampaigns } from '../../../services/generated/CampaignService'

const { data: campaigns, isPending } = useQuery({
  	key: () => ['campaigns'],
  	query: () => getCampaigns(),
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
					<!-- @vue-ignore -->
					<div v-for="item in campaigns" v-text="item.id"></div>
				</div>
				<div v-bind:style="{display: 'flex', flexDirection: 'column', gap: '2rem'}">
					<!-- @vue-ignore -->
					<div v-for="item in campaigns" v-text="item.title"></div>
				</div>
				<div v-bind:style="{display: 'flex', flexDirection: 'column', gap: '2rem'}">
					<!-- @vue-ignore -->
					<div v-for="item in campaigns" v-text="item.isActive? 'Active' : 'Inactive'"></div>
				</div>
			</div>
			
		</div>
	</section>
</template>

<style scoped>

</style>
