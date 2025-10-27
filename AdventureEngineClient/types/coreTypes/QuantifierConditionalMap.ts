import { ExtendedSchemaObject } from "../SchemaObject";
import { Character } from "./Character";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainCondition } from "./DomainCondition";
import { Quantifier } from "./Quantifier";

//If such a domain condition is active, provide a set of modified values to use for the given base quantifier
//Auxuiliary mapping tables can be added if we need compound conditionals or more complex modifiers
export type QuantifierConditionalMap = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {
            IsTrue__DomainCondition: DomainCondition
            Base__Quantifier: Quantifier,
            Modifier__Quantifier: Quantifier
        },
        OneToMany: {}
    }
}>