import { ExtendedSchemaObject } from "../SchemaObject";

//Str/Cha/Con..., ALSO gold quantity, number of actions, derived stats (investigation, athletics, etc.), any effect-targetable meta-information about an entity,
//this is also used for properties on items such as weight or amount of charges
/*
weight: number
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

export type DomainEntityStat = ExtendedSchemaObject<{
    Attributes: {
        IsBaseStat: boolean
    },
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>
