import { defineQuery } from "@pinia/colada";
import { composeQueryContext } from "../queries/queries";
import { generatedInjectableServices } from "./generated/generatedInjectableServices";

export const composedAppInjectionContexts = {
    queries: composeQueryContext(defineQuery, generatedInjectableServices)
} as const