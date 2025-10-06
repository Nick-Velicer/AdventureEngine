import { ExtendedSchemaObject } from "../SchemaObject";
import { Character } from "./Character";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainClass } from "./DomainClass";
import { DomainSpell } from "./DomainSpell";
  
export type ClassSpell = ExtendedSchemaObject<{
    Attributes: {
        
    },
    Relationships: {
        ManyToOne: {
            Class__DomainClass: DomainClass,
            Spell__DomainSpell: DomainSpell
        },
        OneToMany: {}
    }
}>