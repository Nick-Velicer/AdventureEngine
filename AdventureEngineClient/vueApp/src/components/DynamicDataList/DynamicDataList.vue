<script setup lang="ts">
import { computed, h, watch } from 'vue';
import { AppTypes } from '../../../../types/appTypes/appTypes';
import { composedAppInjectionContexts } from '../../../../injections/composedInjectionContexts';
import Loader from '../Loader.vue';
import { typeTemplateMapping } from './config';
import DefaultListTemplate from './templates/DefaultListTemplate.vue';


const store = composedAppInjectionContexts.store();

type PropsType = {
    table: keyof typeof AppTypes
}

const props = defineProps<PropsType>();

const query = composedAppInjectionContexts.queries["useGet" + props.table + "sQuery" as keyof typeof composedAppInjectionContexts.queries]();

</script>

<template>
    <div v-if="query?.isPending === true">
        <Loader variant="icon"/>
    </div>
    <div v-else-if="query?.state?.data?.length < 0">
        Unable to retrieve collection for {{ props.table }}
    </div>
    <div v-else class="container scrollWrapper">
        <div class="header">
            {{ props.table }}
        </div>
        <ul class="list scrollArea">
            <li v-for="value in query.data.value ?? []" class="listItem">
                <Component :is="typeTemplateMapping[props.table] ?? DefaultListTemplate" :value="value"/>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .container {
        gap: v-bind("store.reactiveThemeElement("--spacing-large")");
    }

    .header {

    }


    .listItem {
    }

    .defaultItemTitle {
        font-size: v-bind("store.reactiveThemeElement("--font-size-heading")");
    }

    .defaultItemDescription {
        
    }

</style>