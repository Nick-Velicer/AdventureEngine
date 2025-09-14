<script setup lang="ts">
import { NLayout, NLayoutSider, NMenu } from 'naive-ui'
type PropsType = {
    collapsed: boolean
}

const props = defineProps<PropsType>();

</script>

<template>
    <n-layout v-if="props.collapsed" has-sider>
        <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :collapsed="collapsed"
            show-trigger
        >
            <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            />
        </n-layout-sider>
        <n-layout>
            <span>Content</span>
        </n-layout>
    </n-layout>
</template>

<style scoped>

</style>
