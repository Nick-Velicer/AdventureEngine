<script setup lang="ts">
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import { NSwitch } from 'naive-ui'
import NavMenu from './NavMenu.vue';
import DevTools from './DevTools.vue';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';


const store = composedAppInjectionContexts.store();

const currentThemeColor = computed(() => store.theme["--color-background"]);

</script>

<template>
    <div class="topLevelContainer scrollWrapper">
        <header class="flex w-full h-fit">
            <n-switch v-model:value="store.navMenuCollapsed"/>
            <div class="flex-1 text-center">Header Content</div>
            <DevTools/>
        </header>
        <div class="flex h-full">
            <nav>
                <NavMenu :collapsed="store.navMenuCollapsed"/>
            </nav>
            <main>
                <slot></slot>
                
                <footer class="footerContainer">
                    Footer Content
                </footer>
            </main>
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
