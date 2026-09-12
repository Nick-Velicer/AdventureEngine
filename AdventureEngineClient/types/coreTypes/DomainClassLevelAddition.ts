import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainClass } from "./DomainClass";
import { DomainSubClass } from "./DomainSubClass";
  
export type DomainClassLevelAddition = ExtendedSchemaObject<{
    Attributes: {
        Level: number,
        MulticlassInaccessible: boolean,
    },
    Relationships: {
        ManyToOne: {
            Class__DomainClass?: DomainClass,
            Subclass__DomainSubClass?: DomainSubClass,
        },
        OneToMany: {}
    }
}>