import { ExtendedSchemaObject } from "../SchemaObject";
import { Character } from "./Character";
import { DomainEntityStat } from "./DomainEntityStat";
import { DomainSubClass } from "./DomainSubClass";
  
//Ranged, melee, simple, martial, finesse, etc.
export type DomainWeaponCategory = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>