<script setup lang="ts">
import { useRoute } from 'vue-router';
import { extractRouteBase, type ExtractRouteBase, type routes } from '../utils/routes';

type AppRoutePaths = typeof routes[number]["path"];

//Transitions as specified by the "direction" to move in space
//from one page to another
const spatialTransitions = [
    "up",
    "down",
    "left",
    "right",
    "in",
    "out"
] as const;

type TransitionMeta = Partial<Record<ExtractRouteBase<AppRoutePaths>, typeof spatialTransitions[number]>>;

//All configured adjacencies for pages
const transitionNodes = {
    "Login": {
        "Register": "right"
    },
    "Register": {
        "Login": "left"
    },
    "Home": {
        "CampaignManagement": "in"
    },
    "CampaignManagement": {
        "Home": "out",
        "CharacterManagement": "in"
    },
    "CharacterManagement": {
        "CampaignManagement": "out"
    },

} as const satisfies Partial<Record<ExtractRouteBase<AppRoutePaths>, TransitionMeta>>;

const route = useRoute();

function getActiveTransition(): typeof spatialTransitions[number] | undefined {

    if (route.matched[0] == undefined) {
        return undefined;
    }

    const currentPath = route.matched[0].path as AppRoutePaths;
    const previousPath = window.history.state.back as string | null | undefined;

    if (typeof previousPath != "string") {
        return undefined;
    }

    const currentRouteBase = extractRouteBase(currentPath);
    const previousRouteBase = extractRouteBase(previousPath);

    console.log("Calculated transition: ");
    console.log(previousRouteBase + " going " + transitionNodes[previousRouteBase][currentRouteBase] + " to " + currentRouteBase);
    return transitionNodes[previousRouteBase][currentRouteBase];
}

</script>

<template>
    <Transition :name="getActiveTransition()" mode="out-in">
        <slot></slot>
    </Transition>
</template>

<style scoped>
    .left-enter-active, .left-leave-active {
        transition: opacity 0.25s, transform 0.25s;
    }

    .left-leave-to {
        opacity: 0;
        transform: translateX(50%);
    }

    .left-enter-from {
        opacity: 0;
        transform: translateX(-50%);
    }

    .right-enter-active, .right-leave-active {
        transition: opacity 0.25s, transform 0.25s;
    }

    .right-leave-to {
        opacity: 0;
        transform: translateX(-50%);
    }

    .right-enter-from {
        opacity: 0;
        transform: translateX(50%);
    }
</style>
