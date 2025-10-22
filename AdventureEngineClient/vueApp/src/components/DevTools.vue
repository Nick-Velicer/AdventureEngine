<script setup lang="ts">
import { NSwitch, NButton } from 'naive-ui'
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import ThemeSelector from './ThemeSelector.vue';
import type { Character } from '../../../types/appTypes/appTypes';

const store = composedAppInjectionContexts.store();

const saveCharacter = composedAppInjectionContexts.queries.useSaveCharacterMutation;
const saveCharacterStats = composedAppInjectionContexts.queries.useSaveCharacterDomainCharacterStatInstanceMutation;

async function populateTestCharacter() {

    const character: Character = {
        Id: undefined,
        Attributes: {
            Title: "Test Character 1",
        },
        Relationships: {
            OneToMany: {},
            ManyToOne: {},
        }
    }

    const character2: Character = {
        Id: undefined,
        Attributes: {
            Title: "Test Character 2",
        },
        Relationships: {
            OneToMany: {},
            ManyToOne: {},
        }
    }
    
    const response = await saveCharacter([character, character2]).mutate();

    console.log(response);
}

</script>

<template>
    <ThemeSelector/>
    <n-button v-on:click="populateTestCharacter">Character Init</n-button>
</template>

<style scoped>

</style>
