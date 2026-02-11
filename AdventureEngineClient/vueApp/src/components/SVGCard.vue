<script setup lang="ts">
import type { Component } from "vue";
import { composedAppInjectionContexts } from "../../../injections/composedInjectionContexts";

const store = composedAppInjectionContexts.store();

type PropsType = {
    text: string,
    svgComponent: Component,
}
const props = defineProps<PropsType>();

</script>

<template>
    <div class="svgCard">
        <component :is="props.svgComponent" class="svg"/>
        <div v-text="props.text" class="title"/>
    </div>     
</template>

<style scoped>

.svgCard {
    container-type: size;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: v-bind("store.reactiveThemeElement("--radius-small")");
    padding: min(v-bind("store.reactiveThemeElement("--spacing-large")"), 20%);
    background-color: v-bind("store.reactiveThemeElement("--color-background-secondary")");
    color: v-bind("store.reactiveThemeElement("--text-color-primary")");
    font-family: v-bind("store.reactiveThemeElement("--font-family-headings")");
    transition: box-shadow v-bind("store.reactiveThemeElement("--duration-fast")") ease-in-out; 
    border: 1px solid v-bind("store.reactiveThemeElement("--text-color-primary")");
    overflow: hidden;
    white-space: nowrap;
}

.svgCard:hover {
    box-shadow: v-bind("store.reactiveThemeElement("--box-shadow")");
}

.svg {
    flex: 1;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    fill: v-bind("store.reactiveThemeElement("--text-color-primary")");
}

.title {
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    max-width: 100%;
    text-overflow: ellipsis;
    font-size: min(v-bind("store.reactiveThemeElement("--font-size-heading")"), 25cqw);
    text-align: center;
}

</style>
