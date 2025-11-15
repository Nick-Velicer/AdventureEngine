<script setup lang="ts">
import { Lineicons } from "@lineiconshq/vue-lineicons";
import {
  Dumbbell1Outlined,
  Brush2Outlined,
  HeartOutlined,
  Book1Outlined,
  GlobeStandOutlined,
  Comment1Outlined
} from "@lineiconshq/free-icons";
import { composedAppInjectionContexts } from "../../../injections/composedInjectionContexts";

type PropsType = {
    basicStatName: string
}
const props = defineProps<PropsType>();

const store = composedAppInjectionContexts.store();

//Ideally this would be treated as a super for realsies const with keys,
//but we're cheating and assuming values of a domain table (that will probably never change)
//so there's not a super ideal way to make absolutely sure these values will actually be there
const statToIconMapping: Record<string, string> = {
    Strength: Dumbbell1Outlined,
    Dexterity: Brush2Outlined,
    Constitution: HeartOutlined,
    Intelligence: Book1Outlined,
    Wisdom: GlobeStandOutlined,
    Charisma: Comment1Outlined
};

</script>

<template>
    <Lineicons v-if="statToIconMapping[props.basicStatName] != undefined" :icon="statToIconMapping[props.basicStatName]" :size="24" :color="store.reactiveThemeElement('--text-color-primary')" :stroke-width="1.5" />
    <div v-else>
        Unknown Basic Stat
    </div>     
</template>

<style scoped>

</style>
