import { defineQuery, useQuery, type UseQueryReturn } from "@pinia/colada";
import { defineStore } from 'pinia'
import { composeQueryBuilderContext } from "../queries/queries";
import { generatedInjectableServices } from "./generated/generatedInjectableServices";
import { stateActions, stateDefault, stateGetters } from "../state/clientStateConfig";
import type { Campaign } from "../types/appTypes/appTypes";


export const composedAppInjectionContexts = {
    queries: composeQueryBuilderContext(useQuery, generatedInjectableServices),
    store: defineStore('globalStore', {
        state: () => stateDefault, 
        getters: stateGetters,
        actions: stateActions
    })
} as const