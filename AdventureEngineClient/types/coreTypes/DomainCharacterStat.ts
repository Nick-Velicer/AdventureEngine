import { ExtendedSchemaObject } from "../SchemaObject";

//Str/Cha/Con..., ALSO gold quantity, number of actions, derived stats (investigation, athletics, etc.), any effect-targetable meta-information about a character
/*
strength: number,
dexterity: number,
constitution: number,
intelligence: number,
wisdom: number,
charisma: number,
gold: number,
availableActions: number,
availableBonusActions: number,
baseWalkingSpeed: number,
baseSwimmingSpeed: number,
*/

export type DomainCharacterStat = ExtendedSchemaObject<{
    Attributes: {
        IsBaseStat: boolean
    },
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>
