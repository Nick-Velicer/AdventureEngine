<script setup lang="ts">
import { ref } from "vue";
import { composedAppInjectionContexts } from "../../../../../injections/composedInjectionContexts";
import { type Campaign } from "../../../../../types/appTypes/appTypes";
import type { ListTemplatePropsType } from "../config";
import { NButton } from 'naive-ui';

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
        <nav v-if="isHovered">
            <RouterLink to="/CharacterManagement/1">
                <NButton>
                    Continue (Last Updated Character)
                </NButton>
            </RouterLink>
            <RouterLink :to="'/CampaignManagement/' + props.value.Id">
                <NButton>
                    Manage Campaign
                </NButton>
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
