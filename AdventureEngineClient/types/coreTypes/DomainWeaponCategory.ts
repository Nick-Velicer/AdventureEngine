import { ExtendedSchemaObject } from "../SchemaObject";
import { Character } from "./Character";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainSubClass } from "./DomainSubClass";
  
//Ranged, melee, simple, martial, finesse, etc.
export type DomainWeaponCategory = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>