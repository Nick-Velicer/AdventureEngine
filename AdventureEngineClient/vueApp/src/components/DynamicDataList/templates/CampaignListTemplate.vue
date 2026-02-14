<script setup lang="ts">
import { composedAppInjectionContexts } from "../../../../../injections/composedInjectionContexts";
import { type Campaign } from "../../../../../types/appTypes/appTypes";
import type { ListTemplatePropsType } from "../config";

const props = defineProps<ListTemplatePropsType<Campaign>>();
const store = composedAppInjectionContexts.store();

</script>

<template>
    <RouterLink :to="'/CharacterManagement/' + props.value.Id">
        <div v-text="props.value.Attributes.Title" class="title"/>
        <div v-text="props.value.Attributes.Description" class="description"/>
    </RouterLink>
</template>

<style scoped>
    .title {
        font-size: v-bind("store.reactiveThemeElement("--font-size-heading")");
    }

    .description {
        font-size: v-bind("store.reactiveThemeElement("--font-size-caption")");
    }
</style>
