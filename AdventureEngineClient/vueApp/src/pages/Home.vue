<script setup lang="ts">
import type { UseQueryReturn } from '@pinia/colada';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import type { Campaign } from '../../../types/appTypes/appTypes';
import { useRouter } from 'vue-router';
import SVGCard from '../components/SVGCard.vue';
import Character from '../components/svg/Character.vue';
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
		<div class="aspectRatioContainer">
			<div id="rotationTarget" class="navigationContainer">
				<div class="navigationDial">
					<RouterLink to="/CampaignManagement" class="linkWrapper topLinkWrapper">
						<SVGCard text="Campaigns" :svgComponent="Compass"/>
					</RouterLink>
					<RouterLink to="/CharacterManagement" class="linkWrapper leftLinkWrapper">
						<SVGCard text="Characters" :svgComponent="Character"/>
					</RouterLink>
					<D20 class="d20Icon"/>
					<RouterLink to="/Home" class="linkWrapper rightLinkWrapper">
						<SVGCard text="Lookup" :svgComponent="Books"/>
					</RouterLink>
					<RouterLink to="/Home" class="linkWrapper bottomLinkWrapper">
						<SVGCard text="About" :svgComponent="Bottle"/>
					</RouterLink>
				</div>
				<D20 class="backgroundD20"/>
			</div>
		</div>
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
	container-type: size;
}

.aspectRatioContainer {
	margin-right: auto;
	margin-left: auto;
	width: min(100cqw, 100cqh);
	overflow: hidden;
	aspect-ratio: 1;
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
	z-index: 10;
	clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
}

.backgroundD20 {
	position: absolute;
	width: 170%;
	height: 170%;
	top: -35%;
	left: -35%;
	z-index: 10;
	transform: rotate(20deg); 
	fill: v-bind("store.reactiveThemeElement("--color-background-secondary")");
}

.navigationDial {
	gap: min(v-bind("store.reactiveThemeElement("--spacing-large")"), 2vw);
	aspect-ratio: 1;
	clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
	position: relative;
	z-index: 11;
}

.linkWrapper {
	position: absolute;
	top: 50%;
	left: 50%;
	height: 25cqh;
	width: 15cqw;
}

.topLinkWrapper {
	transform: translate(-50%, -40cqh);
}

.bottomLinkWrapper {
	transform: translate(-50%, 15cqh);
}

.leftLinkWrapper {
	transform: translate(-27.5cqw, -50%);
}

.rightLinkWrapper {
	transform: translate(12.5cqw, -50%);
}

.d20Icon {
	position: absolute;
	inset: 0;
 	margin: auto;
}

.landingText {
	font-size: min(v-bind("store.reactiveThemeElement("--font-size-heading")") * 3, 5vw);
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
