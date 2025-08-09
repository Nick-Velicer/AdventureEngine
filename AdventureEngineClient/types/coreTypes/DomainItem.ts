import { ExtendedSchemaObject } from "../SchemaObject";
import { Quantifier } from "./Quantifier";

//any in-game items
export type DomainItem = ExtendedSchemaObject<{
    Attributes: {
        CustomEffectText?: string

    },
    Relationships: {
        OneHandedQuantifier: Quantifier,
        TwoHandedQuantifier: Quantifier,
    }
}>
