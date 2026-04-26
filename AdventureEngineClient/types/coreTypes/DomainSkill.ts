import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainCharacterStat } from "./DomainCharacterStat";
  
export type DomainSkill = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {
            ParentStat__DomainCharacterStat: DomainCharacterStat
        },
        OneToMany: {}
    }
}>