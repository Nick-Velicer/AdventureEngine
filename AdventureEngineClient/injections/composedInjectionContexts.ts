import { defineQuery } from "@pinia/colada";
import { defineStore } from 'pinia'
import { composeQueryContext } from "../queries/queries";
import { generatedInjectableServices } from "./generated/generatedInjectableServices";
import { stateActions, stateDefault, stateGetters } from "../state/ClientStateConfig";

export const composedAppInjectionContexts = {
    queries: composeQueryContext(defineQuery, generatedInjectableServices),
    store: defineStore('globalStore', {
        state: () => stateDefault, 
        getters: stateGetters,
        actions: stateActions
    })
} as const