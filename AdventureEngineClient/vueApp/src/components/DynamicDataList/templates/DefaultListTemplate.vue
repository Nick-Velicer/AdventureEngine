<script setup lang="ts">
import { composedAppInjectionContexts } from "../../../../../injections/composedInjectionContexts";
import type { SchemaObject } from "../../../../../types/SchemaObject";
import type { ListTemplatePropsType } from "../config";

const props = defineProps<ListTemplatePropsType>();
const store = composedAppInjectionContexts.store();

</script>

<template>
    <div v-text="props.value.Attributes.Title" class="title"/>
    <div v-text="props.value.Attributes.Description" class="description"/>
</template>

<style scoped>
    .title {
        font-size: v-bind("store.reactiveThemeElement("--font-size-heading")");
    }

    .description {
        font-size: v-bind("store.reactiveThemeElement("--font-size-caption")");
    }
</style>
