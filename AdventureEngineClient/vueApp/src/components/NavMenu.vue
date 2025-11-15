<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import { routes } from '../utils/routes';


const store = composedAppInjectionContexts.store();

</script>

<template>
    <nav class="navMenuContainer">
        <RouterLink v-for="route in routes.filter(route => route.primaryNavigation)" :key="route.title" class="navMenuItem" :to="route.path">
            {{ route.title }}
        </RouterLink>
    </nav>
</template>

<style scoped>
    .navMenuContainer {
        display: flex;
        width: fit-content;
        gap: v-bind("store.reactiveThemeElement("--spacing-large")");
        background-color: v-bind("store.reactiveThemeElement("--color-background")");
        font-family: v-bind("store.reactiveThemeElement("--font-family-body")");
    }

    .navMenuItem {
        color: v-bind("store.reactiveThemeElement("--text-color-primary")");
    }
</style>
