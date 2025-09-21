<script setup lang="ts">
import Layout from './components/Layout.vue';
import TestItemDisplay from './components/TestItemDisplay.vue';
import { NConfigProvider } from 'naive-ui';
import "../../theme/generated/variables.css";

</script>

<template>
    <Layout>
        <n-config-provider>
            <RouterView />
        </n-config-provider>
    </Layout>
    
</template>

<style scoped>
</style>
