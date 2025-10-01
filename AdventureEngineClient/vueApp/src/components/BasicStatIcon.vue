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

const statToIconMapping = {
    Strength: Dumbbell1Outlined,
    Dexterity: Brush2Outlined,
    Constitution: HeartOutlined,
    Intelligence: Book1Outlined,
    Wisdom: GlobeStandOutlined,
    Charisma: Comment1Outlined
};

</script>

<template>
    <Lineicons :icon="statToIconMapping[props.basicStatName]" :size="24" :color="store.reactiveThemeElement('--text-color-primary')" :stroke-width="1.5" />
</template>

<style scoped>

</style>
