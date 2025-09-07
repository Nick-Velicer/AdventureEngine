import { defineQuery } from "@pinia/colada";
import { defineStore } from 'pinia'
import { composeQueryBuilderContext } from "../queries/queries";
import { generatedInjectableServices } from "./generated/generatedInjectableServices";
import { stateActions, stateDefault, stateGetters } from "../state/ClientStateConfig";

export const composedAppInjectionContexts = {
    queries: composeQueryBuilderContext(defineQuery, generatedInjectableServices),
    store: defineStore('globalStore', {
        state: () => stateDefault, 
        getters: stateGetters,
        actions: stateActions
    })
} as const