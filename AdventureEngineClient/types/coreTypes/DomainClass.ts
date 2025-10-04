import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainDice } from "./DomainDice";

//Cleric, Barbarian, Ranger, etc.
export type DomainClass = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
            HitDie__DomainDice: DomainDice,
            SpellcastingStat__DomainCharacterStat: DomainCharacterStat,
        },
        OneToMany: {}
    }
}>
