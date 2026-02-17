import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { Quantifier } from "./Quantifier";

export type QuantifierCostSpecifier = ExtendedSchemaObject<{
    Attributes: {
        //e.g. -1 action
        DeltaQuantity?: number,
        //e.g. minus half your movement
        DeltaPercentage?: number
    },
    Relationships: {
        ManyToOne: {
            Cost__DomainCharacterStat?: DomainCharacterStat,
            Quantifier__Quantifier?: Quantifier
        },
        OneToMany: {
        }
    }
}>
