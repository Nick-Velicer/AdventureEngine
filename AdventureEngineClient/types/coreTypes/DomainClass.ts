import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainDice } from "./DomainDice";

//Cleric, Barbarian, Ranger, etc.
export type DomainClass = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
            HitDie__domainDice: DomainDice,
            SpellcastingStat__domainCharacterStat: DomainCharacterStat,
        }
    }
}>
