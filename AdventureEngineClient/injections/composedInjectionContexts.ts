import { defineQuery, useMutation, useQuery, useQueryCache, type QueryCache, type UseQueryReturn } from "@pinia/colada";
import { defineStore } from 'pinia'
import { composeQueryBuilderContext } from "../queries/queries";
import { generatedInjectableServices } from "./generated/generatedInjectableServices";
import { stateActions, stateDefault, stateGetters } from "../state/clientStateConfig";
import type { Campaign } from "../types/appTypes/appTypes";

export const composedAppInjectionContexts = {
    queries: composeQueryBuilderContext(
        useQuery, 
        useMutation, 
        useQueryCache,
        (cacheContext: QueryCache, keys: string[]) => cacheContext.invalidateQueries({
            key: keys,
            exact: true
        }), 
        generatedInjectableServices
    ),
    store: defineStore('globalStore', {
        state: () => stateDefault, 
        getters: stateGetters,
        actions: stateActions
    })
} as const