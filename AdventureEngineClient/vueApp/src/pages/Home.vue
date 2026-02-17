<script setup lang="ts">
import type { UseQueryReturn } from '@pinia/colada';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import type { Campaign } from '../../../types/appTypes/appTypes';
import { useRouter } from 'vue-router';
import SVGCard from '../components/SVGCard.vue';
import Character from '../components/svg/Character.vue';
import type { Component } from 'vue';
import Compass from '../components/svg/Compass.vue';
import Books from '../components/svg/Books.vue';
import Bottle from '../components/svg/Bottle.vue';
import Loader from '../components/Loader.vue';
import D20 from '../components/svg/D20.vue';

const router = useRouter();
const campaignsQuery = composedAppInjectionContexts.queries.useGetCampaignsQuery() as UseQueryReturn<Campaign[]>;
const store = composedAppInjectionContexts.store();

const campaignNavLink = (campaignId: number ) => "/CampaignManagement/" + campaignId.toString();
</script>

<template>
	<Loader v-if="campaignsQuery.isLoading.value === true" variant="icon"/>
	<div v-else class="pageContainer">
		<div id="rotationTarget" class="navigationContainer">
			<div class="navigationBorder"/>
			<div class="navigationDial">
				<RouterLink to="/CampaignManagement" class="linkWrapper">
					<SVGCard text="Campaigns" :svgComponent="Compass"/>
				</RouterLink>
				<div class="flex items-center">
					<RouterLink to="/CharacterManagement" class="linkWrapper">
						<SVGCard text="Characters" :svgComponent="Character"/>
					</RouterLink>
					<D20/>
					<RouterLink to="/Home" class="linkWrapper">
						<SVGCard text="Lookup" :svgComponent="Books"/>
					</RouterLink>
				</div>
				<RouterLink to="/Home" class="linkWrapper">
					<SVGCard text="About" :svgComponent="Bottle"/>
				</RouterLink>
			</div>
			
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
	width: 80%;
	max-width: 100rem;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: column;
	gap: min(v-bind("store.reactiveThemeElement("--spacing-large")"), 2vw);
	overflow-x: hidden;
}

.navigationContainer {
	position: relative;
	transform-style: preserve-3d;
  	transform: perspective(5000px) rotateY(var(--rotateX)) rotateX(var(--rotateY));
}

.navigationBorder {
	position: absolute;
	background: white;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	
	clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
}

.navigationDial {
	flex: 1;
	display: flex;
	gap: min(v-bind("store.reactiveThemeElement("--spacing-large")"), 2vw);
	flex-direction: column;
	clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
}

.landingText {
	font-size: min(v-bind("store.reactiveThemeElement("--font-size-heading")") * 3, 5vw);
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
