<script setup lang="ts">
import { NSwitch, NButton } from 'naive-ui'
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import ThemeSelector from './ThemeSelector.vue';
import type { Campaign, Character, CharacterDomainCharacterStatInstance, DomainCharacterStat } from '../../../types/appTypes/appTypes';

const store = composedAppInjectionContexts.store();

const getStatsQuery = composedAppInjectionContexts.queries.useGetDomainCharacterStatsQuery;
const saveCampaignMutation = composedAppInjectionContexts.queries.useSaveCampaignMutation;
const saveCharacterMutation = composedAppInjectionContexts.queries.useSaveCharacterMutation;
const saveCharacterStatsMutation = composedAppInjectionContexts.queries.useSaveCharacterDomainCharacterStatInstanceMutation;



async function dispatchCampaignsSave() {

    const saveCampaigns = saveCampaignMutation(
        [
            {
                Id: undefined,
                Attributes: {
                    Title: "Campaign 1",
                    Description: "Here is a fun and long description for a campaign. It contains lots of words and should hopefully be able to test overflow UI. Oh boy I love writing filler text since I'm too lazy to get a dummy data library set up."
                },
                Relationships: {
                    ManyToOne: {},
                    OneToMany: {}
                }

            },
            {
                Id: undefined,
                Attributes: {
                    Title: "Campaign 2"
                },
                Relationships: {
                    ManyToOne: {},
                    OneToMany: {}
                }

            },
        ],
        dispatchCharactersSave
    ).mutate;

    const response = await saveCampaigns();
}

async function dispatchCharactersSave(campaigns: Campaign[]) {

    const characters: Character[] = campaigns.map(campaign => ({
        Id: undefined,
        Attributes: {
            Title: "Test Character 1",
        },
        Relationships: {
            ManyToOne: {
                Campaign__Campaign: campaign
            },
            OneToMany: {}
        }
    }));
    
    const saveCharacter = saveCharacterMutation(characters, dispatchStatsSave).mutate;

    const response = await saveCharacter();
}

async function dispatchStatsSave(characters: Character[]) {

    const getStats = getStatsQuery().refresh;
    
    const stats = await getStats();

    const baseStats = (stats.data as Array<DomainCharacterStat>).filter(stat => stat.Attributes.IsBaseStat === true);

    const saveStats = saveCharacterStatsMutation(
        characters.map(character => baseStats.map((stat, index) => ({
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
        } as CharacterDomainCharacterStatInstance))).flat(Infinity),
        (data: any) => console.log(data)
    ).mutate;

    const response = await saveStats();
}

</script>

<template>
    <ThemeSelector/>
    <n-button v-on:click="dispatchCampaignsSave">Test Data Init</n-button>
</template>

<style scoped>

</style>
