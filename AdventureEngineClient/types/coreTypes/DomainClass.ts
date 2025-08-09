import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainDice } from "./DomainDice";

//Cleric, Barbarian, Ranger, etc.
export type DomainClass = ExtendedSchemaObject<{
    attributes: {
    },
    relationships: {
        hitDie__domainDice: DomainDice,
        spellcastingStat__domainCharacterStat: DomainCharacterStat,
    }
}>
