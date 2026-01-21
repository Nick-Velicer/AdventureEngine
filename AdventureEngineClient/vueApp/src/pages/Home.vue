<script setup lang="ts">
import type { UseQueryReturn } from '@pinia/colada';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import type { Campaign } from '../../../types/appTypes/appTypes';
import { getActiveUser } from '../../../services/custom/AuthenticationService';
import { NButton } from 'naive-ui';
import ActionCard from '../components/SVGCard.vue';
import { useRouter } from 'vue-router';
import SVGCard from '../components/SVGCard.vue';
import Character from '../components/svg/Character.vue';
import type { Component } from 'vue';
import Compass from '../components/svg/Compass.vue';
import Books from '../components/svg/Books.vue';
import Bottle from '../components/svg/Bottle.vue';
import Loader from '../components/Loader.vue';

const router = useRouter();
const campaignsQuery = composedAppInjectionContexts.queries.useGetCampaignsQuery() as UseQueryReturn<Campaign[]>;
const store = composedAppInjectionContexts.store();

const campaignNavLink = (campaignId: number ) => "/CampaignManagement/" + campaignId.toString();

type CardModule = {
	title: string,
	to: string,
	svg: Component
}
const cardConfig: Array<CardModule> = [
	{
		title: "Campaigns",
		to: "/CampaignManagement",
		svg: Compass
	},
	{
		title: "Characters",
		to: "/CharacterManagement",
		svg: Character
	},
	{
		title: "Lookup",
		to: "/Home",
		svg: Books
	},
	{
		title: "About",
		to: "/Home",
		svg: Bottle
	}
];

</script>

<template>
	<Loader v-if="campaignsQuery.isLoading.value === true" variant="icon"/>
	<div v-else class="pageContainer">
		<div class="svgCardContainer">
			<RouterLink v-for="cardMeta in cardConfig" :to="cardMeta.to" class="linkWrapper">
				<SVGCard :text="cardMeta.title" :svgComponent="cardMeta.svg"/>
			</RouterLink>
		</div>
		<Transition name="fade" appear>
			<div class="landingText">
				Welcome back adventurer.
			</div>
		</Transition>
	</div>
</template>

<style scoped>

.pageContainer {
	height: 100%;
	width: 70%;
	max-width: 100rem;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: column;
	gap: v-bind("store.reactiveThemeElement("--spacing-large")");
}

.landingText {
	font-size: calc(v-bind("store.reactiveThemeElement("--font-size-heading")") * 3);

}

.svgCardContainer {
	flex: 1;
	display: flex;
	gap: v-bind("store.reactiveThemeElement("--spacing-large")");
}

.linkWrapper {
	flex: 1;
	height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity v-bind("store.reactiveThemeElement("--easing-slow")") ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
