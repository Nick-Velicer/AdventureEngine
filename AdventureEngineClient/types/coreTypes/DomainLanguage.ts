import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainCharacterStat } from "./DomainCharacterStat";
  
//Common, Dwarvish, Abyssal, etc.
export type DomainLanguage = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>