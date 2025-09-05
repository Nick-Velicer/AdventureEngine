<script setup lang="ts">
import { type CharacterDomainCharacterStatInstance } from "../../../types/appTypes/appTypes"

type PropsType = {
    statInstance: CharacterDomainCharacterStatInstance
}
const props = defineProps<PropsType>();
</script>

<template>
    <div>
        Hi
    </div>
    <div id="testId" v-text="props.statInstance.Relationships.ManyToOne.StatInstance__DomainCharacterStat.Attributes.Title">
    </div>
	<div v-text="props.statInstance.Attributes.Title">
    </div>
</template>

<style scoped>

</style>
