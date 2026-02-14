<script setup lang="ts">
import { ref } from "vue";
import { composedAppInjectionContexts } from "../../../../../injections/composedInjectionContexts";
import { type Campaign } from "../../../../../types/appTypes/appTypes";
import type { ListTemplatePropsType } from "../config";
import Button from "../../Button.vue";

const props = defineProps<ListTemplatePropsType<Campaign>>();
const store = composedAppInjectionContexts.store();

const isHovered = ref(false);

function toggleHovered() {
    isHovered.value = !isHovered.value
}

</script>

<template>
    <div @mouseenter="toggleHovered" @mouseleave="toggleHovered">
    
        <div v-text="props.value.Attributes.Title" class="title"/>
        <div v-text="props.value.Attributes.Description" class="description"/>
        <nav>
            <RouterLink to="/CharacterManagement/1">
                <Button variant="Primary">
                    Continue (Last Updated Character)
                </Button>
            </RouterLink>
            <RouterLink :to="'/CampaignManagement/' + props.value.Id">
                <Button variant="Utility">
                    Manage Campaign
                </Button>
            </RouterLink>
        </nav>
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
