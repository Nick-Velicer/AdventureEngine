import { ExtendedSchemaObject } from "../SchemaObject";
import { Quantifier } from "./Quantifier";

//any in-game items
export type DomainItem = ExtendedSchemaObject<{
    attributes: {
        customEffectText?: string

    },
    relationships: {
        oneHandedQuantifier: Quantifier,
        twoHandedQuantifier: Quantifier,
    }
}>
