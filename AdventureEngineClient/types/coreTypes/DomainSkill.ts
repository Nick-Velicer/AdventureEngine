import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainEntityStat } from "./DomainEntityStat";
  
export type DomainSkill = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {
            ParentStat__DomainEntityStat: DomainEntityStat
        },
        OneToMany: {}
    }
}>