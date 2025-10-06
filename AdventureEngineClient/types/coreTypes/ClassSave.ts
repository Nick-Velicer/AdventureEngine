import { ExtendedSchemaObject } from "../SchemaObject";
import { Character } from "./Character";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainClass } from "./DomainClass";
  
export type ClassSave = ExtendedSchemaObject<{
    Attributes: {
        
    },
    Relationships: {
        ManyToOne: {
            Class__DomainClass: DomainClass,
            Stat__DomainCharacterStat: DomainCharacterStat
        },
        OneToMany: {}
    }
}>