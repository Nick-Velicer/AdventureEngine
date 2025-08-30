import { ExtendedSchemaObject } from "../SchemaObject";
import { Character } from "./Character";
import { DomainCharacterStat } from "./DomainCharacterStat";
  
export type CharacterDomainCharacterStatInstance = ExtendedSchemaObject<{
    Attributes: {
        
    },
    Relationships: {
        ManyToOne: {
            Character__Character: Character,
            StatInstance__DomainCharacterStat: DomainCharacterStat
        },
        OneToMany: {}
    }
}>