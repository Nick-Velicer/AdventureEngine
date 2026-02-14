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
        <header class="headerContainer">
            <div class="flex-1 flex items-center gap-2">
                <DevTools/>
            </div>
            <NavMenu/>
            <div class="flex-1"/>
        </header>
        <main class="scrollWrapper mainContentWrapper">
            <slot></slot>
        </main>
        <footer class="footerContainer">
            Footer Content
        </footer>
    </div>
    
</template>

<style scoped>

.topLevelContainer {
    height: 100vh;
    width: 100vw;
    padding: v-bind("store.reactiveThemeElement("--spacing-small")");
    background-color: v-bind("store.reactiveThemeElement("--color-background")");
    color: v-bind("store.reactiveThemeElement("--text-color-primary")");
    font-family: v-bind("store.reactiveThemeElement("--font-family-body")");
    overflow-x: hidden;
}

.mainContentWrapper {
    flex: 1;
    padding: v-bind("store.reactiveThemeElement("--spacing-small")");
    overflow-x: hidden;
}

.headerContainer {
    display: flex;
    width: 100%;
    align-items: center;
}

.footerContainer {

}


</style>
