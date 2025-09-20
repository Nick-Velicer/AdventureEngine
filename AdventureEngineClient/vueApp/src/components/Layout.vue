<script setup lang="ts">
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import { NSwitch } from 'naive-ui'
import NavMenu from './NavMenu.vue';
import DevTools from './DevTools.vue';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';


const store = composedAppInjectionContexts.store();

</script>

<template>
    <div class="topLevelContainer scrollWrapper">
        <header class="flex w-full h-fit">
            <DevTools/>
            <NavMenu/>
        </header>
        <div class="scrollArea">
            <main>
                <slot></slot>
            </main>
            <footer class="footerContainer">
                Footer Content
            </footer>
        </div>
    </div>
    
</template>

<style scoped>

.topLevelContainer {
    background-color: v-bind("store.reactiveThemeElement("--color-background")");
    color: v-bind("store.reactiveThemeElement("--text-color-primary")");
    font-family: v-bind("store.reactiveThemeElement("--font-family-body")");
}


</style>
