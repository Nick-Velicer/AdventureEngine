import { ExtendedSchemaObject } from "../SchemaObject";
import { Character } from "./Character";
import { DomainEntityStat } from "./DomainEntityStat";
  
export type CharacterDomainEntityStatInstance = ExtendedSchemaObject<{
    Attributes: {
        Value: number
    },
    Relationships: {
        ManyToOne: {
            Character__Character: Character,
            Stat__DomainEntityStat: DomainEntityStat
        },
        OneToMany: {}
    }
}>