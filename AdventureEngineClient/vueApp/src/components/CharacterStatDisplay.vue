<script setup lang="ts">
import { type CampaignEntityDomainEntityStatInstance } from "../../../types/appTypes/appTypes"
import BasicStatIcon from "./BasicStatIcon.vue";

type PropsType = {
    statInstance: CampaignEntityDomainEntityStatInstance
}
const props = defineProps<PropsType>();

</script>

<template>
    <BasicStatIcon :basic-stat-name="props.statInstance.Relationships.ManyToOne.Stat__DomainEntityStat.Attributes.Title ?? ''"/>
	<div v-text="props.statInstance.Attributes.Value"/>
</template>

<style scoped>

</style>
