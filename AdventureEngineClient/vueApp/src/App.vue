<script setup lang="ts">
import Layout from './components/Layout.vue';
import TestItemDisplay from './components/TestItemDisplay.vue';
import "./main.css"
import { NConfigProvider, NMessageProvider, NModalProvider } from 'naive-ui';
import "../../theme/generated/variables.css";
import type { routes } from './utils/routes';
import { useRoute } from 'vue-router';
import PageTransitionProvider from './providers/PageTransitionProvider.vue';
import SessionGuardProvider from './providers/SessionGuardProvider.vue';
import MouseFollowerProvider from './providers/MouseFollowerProvider.vue';

</script>

<template>
    <NMessageProvider placement="top-right">
        <NModalProvider> 
            <NConfigProvider>
                <MouseFollowerProvider>
                    <Layout>
                        <RouterView v-slot="{ Component, route }">
                            <SessionGuardProvider>
                                <PageTransitionProvider>
                                    <Component :is="Component" :key="route.path"/>
                                </PageTransitionProvider>
                            </SessionGuardProvider>
                        </RouterView>
                    </Layout>
                </MouseFollowerProvider>
            </NConfigProvider>
        </NModalProvider>
    </NMessageProvider>
</template>

<style scoped>
</style>
