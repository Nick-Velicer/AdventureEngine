<script setup lang="ts">
import { ref } from "vue";
import { composedAppInjectionContexts } from "../../../../../injections/composedInjectionContexts";
import { type Character } from "../../../../../types/appTypes/appTypes";
import type { ListTemplatePropsType } from "../config";
import Button from "../../Button.vue";

const props = defineProps<ListTemplatePropsType<Character>>();
const store = composedAppInjectionContexts.store();

</script>

<template>
    <div>
        <div v-text="props.value.Attributes.Title" class="title"/>
        <div v-text="props.value.Attributes.Description ?? 'No description available.'" class="description"/>
        <div v-text="props.value.Relationships.ManyToOne.Species__DomainSpecies?.Attributes?.Title" class="description"/>
        <div v-for="value in props.value.Relationships.OneToMany.SubClasses__CampaignEntityDomainSubClassInstance" v-text="value.Attributes?.Level" class="description"/>
        <RouterLink v-bind:to="'/CharacterManagement/' + props.value.Id">
            <Button variant="Primary">
                Select
            </Button>
        </RouterLink>
    </div>
    
</template>

<style scoped>
    .title {
        font-size: v-bind("store.reactiveThemeElement("--font-size-heading")");
    }

    .description {
        font-size: v-bind("store.reactiveThemeElement("--font-size-caption")");
    }
</style>
