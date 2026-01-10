<script setup lang="ts">
import type { UseQueryReturn } from '@pinia/colada';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import type { Campaign } from '../../../types/appTypes/appTypes';
import { getActiveUser } from '../../../services/custom/AuthenticationService';
import { NButton } from 'naive-ui';


const state = composedAppInjectionContexts.store();
const campaignsQuery = composedAppInjectionContexts.queries.useGetCampaignsQuery() as UseQueryReturn<Campaign[]>;

const campaignNavLink = (campaignId: number ) => "/CampaignManagement/" + campaignId.toString() 

</script>

<template>
    <section>
		<p v-if="campaignsQuery.isLoading.value === true">
		Loading...
		</p>
		<div v-else>
			<NButton :onClick="getActiveUser">
				Test Active User
			</NButton>

			<RouterLink v-for="campaign in campaignsQuery.data.value" :key="campaign.Attributes.Title" :to="campaignNavLink(campaign.Id!)">
				{{ campaign.Attributes.Title }}
			</RouterLink>
		</div>
	</section>
	
</template>

<style scoped>

</style>
