import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainEntityStat } from "./DomainEntityStat";
import { DomainCurrencyDenomination } from "./DomainCurrencyDenomination";
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
            Cost__DomainEntityStat?: DomainEntityStat,
            Cost__DomainCurrencyDenomination?: DomainCurrencyDenomination,
            Quantifier__Quantifier?: Quantifier
        },
        OneToMany: {
        }
    }
}>
