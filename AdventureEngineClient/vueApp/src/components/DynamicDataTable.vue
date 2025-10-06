<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NDataTable, NButton } from 'naive-ui'
import { computed, h, watch } from 'vue'
import { AppTypes } from '../../../types/appTypes/appTypes'
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts'
import type { SchemaObject } from '../../../types/SchemaObject'
import { flattenSchemaObject } from '../utils/utils'

type PropsType = {
    table: keyof typeof AppTypes
}

const props = defineProps<PropsType>();

//Some wack function syntax here, but getting our dynamic query context resolved into a computed value that Vue can reactively update on props change
const query = computed(() => composedAppInjectionContexts.queries["useGet" + props.table + "sQuery" as keyof typeof composedAppInjectionContexts.queries]());

//Triggering a query refresh when it changes otherwise a new query will be set but never actually refresh
console.log(query.value);

</script>

<template>
    <n-button v-on:click="() => console.log(query)">See Query Result</n-button>
    <n-button v-on:click="() => query.refetch()">Test Query Refresh</n-button>
    <div>
        {{ query?.toString() }}
    </div>
    <div v-if="query?.value?.isPending === true">
        Loading...
    </div>
    <div v-else-if="query?.value?.state?.data?.length < 0">
        Unable to retrieve collection for {{ props.table }}
    </div>
    <div v-else>
        <div>
            {{ props.table }}
        </div>
        <n-data-table
            :columns="query?.data?.value?.length > 0? Object.keys(flattenSchemaObject(query.data.value[0])).map(columnName => ({
                title: columnName.replace('__', ': ').split(/(?=[A-Z])/).join(' '),
                key: columnName
            })) : []"
            :data="query?.data?.value?.length > 0? query.data.value.map(object => flattenSchemaObject(object)) : []"
            :bordered="false"
        />
    </div>
        
    
</template>