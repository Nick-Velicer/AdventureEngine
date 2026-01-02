<script setup lang="ts">
import Layout from './components/Layout.vue';
import TestItemDisplay from './components/TestItemDisplay.vue';
import "./main.css"
import { NConfigProvider, NMessageProvider } from 'naive-ui';
import "../../theme/generated/variables.css";
import type { routes } from './utils/routes';
import { useRoute } from 'vue-router';
import PageTransitionProvider from './components/PageTransitionProvider.vue';

</script>

<template>
    <NMessageProvider placement="top-right">
        <NConfigProvider>
            <Layout>
                <RouterView v-slot="{ Component, route }">
                    <PageTransitionProvider>
                        <Component :is="Component" :key="route.path"/>
                    </PageTransitionProvider>
                </RouterView>
            </Layout>
        </NConfigProvider>
    </NMessageProvider>
</template>

<style scoped>
</style>
