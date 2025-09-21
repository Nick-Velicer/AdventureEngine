<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NDataTable, NButton } from 'naive-ui'
import { h } from 'vue'
import { AppTypes } from '../../../types/appTypes/appTypes'
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts'
import type { SchemaObject } from '../../../types/SchemaObject'
import { flattenSchemaObject } from '../utils/utils'

type PropsType = {
    table: keyof typeof AppTypes
}

const props = defineProps<PropsType>();

const queryInitTitle = "createGet" + props.table + "sQuery" 

const createTableDataQuery = composedAppInjectionContexts.queries[queryInitTitle as keyof typeof composedAppInjectionContexts.queries];

const tableQuery = createTableDataQuery();

const tableResponse = tableQuery();

console.log(tableResponse);

</script>

<template>
    <n-button v-on:click="() => console.log(tableResponse)">See Query Result</n-button>
    <n-button v-on:click="() => tableResponse.refetch()">Test Query Refresh</n-button>
    <div v-if="tableResponse.isPending === true">
        Loading...
    </div>
    <div v-else-if="tableResponse.state.data?.length < 0">
        Unable to retrieve collection for {{ props.table }}
    </div>
        <n-data-table
            v-else
            :columns="tableResponse?.data?.value?.length > 0? Object.keys(flattenSchemaObject(tableResponse.data.value[0])).map(columnName => ({
    title: columnName,
    key: columnName
})) : []"
            :data="tableResponse?.data?.value?.length > 0?  tableResponse.data.value.map(object => flattenSchemaObject(object)) : []"
            :bordered="false"
        />
    
</template>