import type { Component } from "vue";
import CampaignListTemplate from "./templates/CampaignListTemplate.vue";
import DefaultListTemplate from "./templates/DefaultListTemplate.vue";
import { AppTypes } from "../../../../types/appTypes/appTypes";
import type { SchemaObject } from "../../../../types/SchemaObject";

export type ListTemplatePropsType<T extends typeof AppTypes[keyof typeof AppTypes] = SchemaObject> = { 
    value: T 
};

export const typeTemplateMapping: Partial<{
    [key in keyof typeof AppTypes]: Component<ListTemplatePropsType<typeof AppTypes[key]>>
}> = {
    "Campaign": CampaignListTemplate
};
