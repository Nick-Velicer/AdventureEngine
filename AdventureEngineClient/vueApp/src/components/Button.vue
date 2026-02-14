<script setup lang="ts">
import { NButton } from 'naive-ui';
import { composedAppInjectionContexts } from "../../../injections/composedInjectionContexts";
import type { ThemeVariables } from '../../../theme/themeConfig';

type PropsType = {
    variant?: "Primary" | "Utility" | "Negatory"
}
const props = defineProps<PropsType>();

const store = composedAppInjectionContexts.store();

const colorMap = {
    "Primary": "--color-success",
    "Negatory": "--color-error",
    "Utility": "--color-primary"
} as const satisfies Record<NonNullable<PropsType["variant"]>, ThemeVariables>

</script>

<template>
    <NButton class="button" :color="store.reactiveThemeElement(typeof props.variant === 'string'? colorMap[props.variant] : '--color-primary')">
        <slot></slot>
    </NButton>    
</template>

<style scoped>
    .button {
        border-radius: v-bind("store.reactiveThemeElement("--radius-small")");
        font-family: v-bind("store.reactiveThemeElement("--font-family-headings")");
    }
</style>
