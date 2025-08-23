<script setup lang="ts">
import TestItemDisplay from './components/TestItemDisplay.vue'
</script>

<template>
      <h1>Hello App!</h1>
    <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
    <nav>
      <RouterLink to="/Test">Test</RouterLink>
      <RouterLink to="/CharacterManagement">CharacterManagement</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
</template>

<style scoped>
</style>
