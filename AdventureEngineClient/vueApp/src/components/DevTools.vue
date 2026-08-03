<script setup lang="ts">
import { NSwitch} from 'naive-ui';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import ThemeSelector from './ThemeSelector.vue';
import type { Campaign, Character, CampaignEntityDomainEntityStatInstance, CampaignEntityDomainSubClassInstance, DomainEntityStat, DomainSubClass } from '../../../types/appTypes/appTypes';
import Button from './Button.vue';

const store = composedAppInjectionContexts.store();

const getSubclassesQuery = composedAppInjectionContexts.queries.useGetDomainSubClasssQuery;
const saveSubclassMappingsMutation = composedAppInjectionContexts.queries.useSaveCampaignEntityDomainSubClassInstanceMutation;
const getStatsQuery = composedAppInjectionContexts.queries.useGetDomainEntityStatsQuery;
const saveCampaignMutation = composedAppInjectionContexts.queries.useSaveCampaignMutation;
const getCharactersQuery = composedAppInjectionContexts.queries.useGetCharactersQuery;
const saveCharacterMutation = composedAppInjectionContexts.queries.useSaveCharacterMutation;
const saveCharacterStatsMutation = composedAppInjectionContexts.queries.useSaveCampaignEntityDomainEntityStatInstanceMutation;



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
    
    const saveCharacter = saveCharacterMutation(characters, (characters) => dispatchStatsSave(characters)).mutate;

    await saveCharacter();
}

async function dispatchStatsSave(characters: Array<Character>) {

    const getStats = getStatsQuery().refresh;
    
    const stats = await getStats();

    const baseStats = (stats.data as Array<DomainEntityStat>).filter(stat => stat.Attributes.IsBaseStat === true);

    const saveStats = saveCharacterStatsMutation(
        characters.map(character => baseStats.map((stat, index) => ({
            Id: undefined,
            Attributes: {
                Value: index + 10
            },
            Relationships: {
                ManyToOne: {
                    Character__CampaignEntity: character,
                    Stat__DomainEntityStat: stat
                },
                OneToMany: {}
            }
        } as CampaignEntityDomainEntityStatInstance))).flat(Infinity),
        () => dispatchSubclassMappingSave(characters)
    ).mutate;

    await saveStats();
}

async function dispatchSubclassMappingSave(characters: Character[]) {
    const getSubclasses = getSubclassesQuery().refresh;
    
    const subclassesResponse = await getSubclasses();

    const subclasses = (subclassesResponse.data as Array<DomainSubClass>);
    
    const saveSubclasses = saveSubclassMappingsMutation(
        characters.map((character, index) => subclasses.slice(index, index * 2).map((subclass, index) => ({
            Id: undefined,
            Attributes: {
                Level: index
            },
            Relationships: {
                ManyToOne: {
                    Character__CampaignEntity: character,
                    SubClass__DomainSubClass: subclass
                },
                OneToMany: {}
            }
        } as CampaignEntityDomainSubClassInstance))).flat(Infinity),
        (data: any) => console.log(data)
    ).mutate;

    console.log("here");

    await saveSubclasses();
    
}

</script>

<template>
    <ThemeSelector/>
    <Button variant="Primary" @click="dispatchCampaignsSave">
        Test Init
    </Button>
</template>

<style scoped>

</style>
