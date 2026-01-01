<script setup lang="ts">
import Layout from './components/Layout.vue';
import TestItemDisplay from './components/TestItemDisplay.vue';
import "./main.css"
import { NConfigProvider } from 'naive-ui';
import "../../theme/generated/variables.css";
import type { routes } from './utils/routes';
import { useRoute } from 'vue-router';
import PageTransitionProvider from './components/PageTransitionProvider.vue';

</script>

<template>
    <Layout>
        <n-config-provider>
            <RouterView v-slot="{ Component, route }">
                <PageTransitionProvider>
                    <Component :is="Component" :key="route.path"/>
                </PageTransitionProvider>
            </RouterView>
        </n-config-provider>
    </Layout>
    
</template>

<style scoped>
</style>
