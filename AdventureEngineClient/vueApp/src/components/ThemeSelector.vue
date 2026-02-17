<script setup lang="ts">
import { NSwitch } from 'naive-ui'
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';

const store = composedAppInjectionContexts.store();

</script>

<template>
    <NSwitch
        checked-value="Dark"
        unchecked-value="Light"
        v-on:update:value="store.setTheme"
    >
        <template #checked>
            Dark Mode
        </template>
        <template #unchecked>
            Light Mode
        </template>
    </NSwitch>
</template>

<style scoped>

</style>
