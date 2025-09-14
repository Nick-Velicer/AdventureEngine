<script setup lang="ts">
import { NSwitch } from 'naive-ui'
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import ThemeSelector from './ThemeSelector.vue';

const store = composedAppInjectionContexts.store();

</script>

<template>
    <ThemeSelector/>
</template>

<style scoped>

</style>
