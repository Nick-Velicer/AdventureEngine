<script setup lang="ts">
import { NSwitch, NButton } from 'naive-ui'
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import ThemeSelector from './ThemeSelector.vue';
import type { Character } from '../../../types/appTypes/appTypes';

const store = composedAppInjectionContexts.store();

const updateCharacter = composedAppInjectionContexts.queries.useSaveCharacterMutation;

function populateTestCharacter() {

    const character: Character = {
        Id: undefined,
        Attributes: {
            Title: "Test Character",
        },
        Relationships: {
            OneToMany: {},
            ManyToOne: {},
        }
    }
    
    const response = updateCharacter(character).mutate();
    console.log(response);
}

</script>

<template>
    <ThemeSelector/>
    <n-button v-on:click="populateTestCharacter">Character Init</n-button>
</template>

<style scoped>

</style>
