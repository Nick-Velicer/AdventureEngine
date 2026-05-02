import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainEntityStat } from "./DomainEntityStat";
  
//Common, Dwarvish, Abyssal, etc.
export type DomainLanguage = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>