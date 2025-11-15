<script setup lang="ts">
import { type CharacterDomainCharacterStatInstance } from "../../../types/appTypes/appTypes"
import BasicStatIcon from "./BasicStatIcon.vue";

type PropsType = {
    statInstance: CharacterDomainCharacterStatInstance
}
const props = defineProps<PropsType>();

</script>

<template>
    <BasicStatIcon :basic-stat-name="props.statInstance.Relationships.ManyToOne.Stat__DomainCharacterStat.Attributes.Title ?? ''"/>
	<div v-text="props.statInstance.Attributes.Value"/>
</template>

<style scoped>

</style>
