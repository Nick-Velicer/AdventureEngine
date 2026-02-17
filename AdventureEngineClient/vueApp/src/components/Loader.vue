<script setup lang="ts">
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import D20 from './svg/D20.vue';

type PropsType = {
    variant: "icon" | "text"
}
const props = defineProps<PropsType>();

const store = composedAppInjectionContexts.store();

</script>

<template>
    <D20 v-if="props.variant == 'icon'" class="rotatingLoader"/>
    <div v-else-if="props.variant == 'text'" class="flex items-end w-fit mx-auto">
        <div class="loadingText">Loading</div>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    </div>
</template>

<style scoped>


@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(540deg);
  }
}

.rotatingLoader {
    margin-right: auto;
    margin-left: auto;
    fill: v-bind("store.reactiveThemeElement("--text-color-primary")");
    animation-name: spin;
    animation-duration: 1.2s;
    animation-timing-function: cubic-bezier(0.1, 0.65, 0.8, 0.1);
    animation-iteration-count: infinite;
}

.loadingText {
    color: v-bind("store.reactiveThemeElement("--text-color-primary")");
    font-family: v-bind("store.reactiveThemeElement("--font-family-body")");
    font-size: v-bind("store.reactiveThemeElement("--font-size-heading")");
    font-weight: 400;
}

.dot:nth-child(1) {
    animation-delay: -0.32s;
}

.dot:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes bounce {
    0%, 80%, 100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
}

.dot {
    display: inline-block;
    width: 3px;
    height: 3px;
    margin-left: 0.4rem;
    margin-bottom: 0.7rem;
    background-color: v-bind("store.reactiveThemeElement("--text-color-primary")");
    border-radius: 50%;
    animation: bounce 1.2s infinite ease-in-out both;
}

</style>
