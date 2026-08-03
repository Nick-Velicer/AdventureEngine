import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainEntityStat } from "./DomainEntityStat";
import { DomainClass } from "./DomainClass";
  
export type ClassSave = ExtendedSchemaObject<{
    Attributes: {
        
    },
    Relationships: {
        ManyToOne: {
            Class__DomainClass: DomainClass,
            Stat__DomainEntityStat: DomainEntityStat
        },
        OneToMany: {}
    }
}>