<script setup lang="ts" generic="T extends keyof typeof AppTypes">
import { computed, h, watch } from 'vue';
import { AppTypes } from '../../../../types/appTypes/appTypes';
import { composedAppInjectionContexts } from '../../../../injections/composedInjectionContexts';
import Loader from '../Loader.vue';
import { typeTemplateMapping } from './config';
import DefaultListTemplate from './templates/DefaultListTemplate.vue';


const store = composedAppInjectionContexts.store();

type PropsType = {
    table: T
}

const props = defineProps<PropsType>();

//Some wack function syntax here, but getting our dynamic query context resolved into a computed value that Vue can reactively update on props change
const query = computed(() => composedAppInjectionContexts.queries["useGet" + props.table + "sQuery" as keyof typeof composedAppInjectionContexts.queries]());


</script>

<template>
    <div v-if="query?.value?.isPending === true">
        <Loader variant="icon"/>
    </div>
    <div v-else-if="query?.value?.state?.data?.length < 0">
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
        height: 100vh;
    }

    .defaultItemTitle {
        font-size: v-bind("store.reactiveThemeElement("--font-size-heading")");
    }

    .defaultItemDescription {
        
    }

</style>