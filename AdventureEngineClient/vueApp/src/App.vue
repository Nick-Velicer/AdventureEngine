<script setup lang="ts">
import Layout from './components/Layout.vue';
import TestItemDisplay from './components/TestItemDisplay.vue';
import "../../theme/generated/variables.css";

</script>

<template>
    <Layout>
        <h1>Hello App!</h1>
        <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
        <nav>
        <RouterLink to="/Test">Test</RouterLink>
        <RouterLink to="/CharacterManagement">CharacterManagement</RouterLink>
        </nav>
        <main>
        <RouterView />
        </main>
    </Layout>
    
</template>

<style scoped>
</style>
