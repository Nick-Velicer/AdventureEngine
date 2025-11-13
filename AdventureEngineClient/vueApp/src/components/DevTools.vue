<script setup lang="ts">
import { NSwitch, NButton } from 'naive-ui'
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import ThemeSelector from './ThemeSelector.vue';
import type { Character, CharacterDomainCharacterStatInstance, DomainCharacterStat } from '../../../types/appTypes/appTypes';

const store = composedAppInjectionContexts.store();

const getStatsQuery = composedAppInjectionContexts.queries.useGetDomainCharacterStatsQuery;
const saveCharacterMutation = composedAppInjectionContexts.queries.useSaveCharacterMutation;
const saveCharacterStatsMutation = composedAppInjectionContexts.queries.useSaveCharacterDomainCharacterStatInstanceMutation;

async function populateTestCharacter() {

    const character: Character = {
        Id: undefined,
        Attributes: {
            Title: "Test Character 1",
        },
        Relationships: {
            ManyToOne: {},
            OneToMany: {}
        }
    }
    
    const saveCharacter = saveCharacterMutation(character, dispatchStatsSave).mutate;

    const response = await saveCharacter();
}

async function dispatchStatsSave(character: Character) {

    const getStats = getStatsQuery().refresh;
    
    const stats = await getStats();

    const baseStats = (stats.data as Array<DomainCharacterStat>).filter(stat => stat.Attributes.IsBaseStat === true);

    const saveStats = saveCharacterStatsMutation(
        baseStats.map((stat, index) => ({
            Id: undefined,
            Attributes: {
                Value: index + 10
            },
            Relationships: {
                ManyToOne: {
                    Character__Character: character,
                    Stat__DomainCharacterStat: stat
                },
                OneToMany: {}
            }

        } as CharacterDomainCharacterStatInstance)),
        (data: any) => console.log(data)
    ).mutate;

    const response = await saveStats();
}

</script>

<template>
    <ThemeSelector/>
    <n-button v-on:click="populateTestCharacter">Character Init</n-button>
</template>

<style scoped>

</style>
