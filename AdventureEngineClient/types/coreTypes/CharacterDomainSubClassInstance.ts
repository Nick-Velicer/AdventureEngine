import { ExtendedSchemaObject } from "../SchemaObject";
import { Character } from "./Character";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainSubClass } from "./DomainSubClass";
  
export type CharacterDomainSubClassInstance = ExtendedSchemaObject<{
    Attributes: {
        Level: number
    },
    Relationships: {
        ManyToOne: {
            Character__Character: Character,
            SubClass__DomainSubClass: DomainSubClass
        },
        OneToMany: {}
    }
}>