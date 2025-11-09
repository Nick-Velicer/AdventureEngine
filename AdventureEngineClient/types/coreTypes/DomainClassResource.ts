import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainClass } from "./DomainClass";
import { DomainSubClass } from "./DomainSubClass";
import { Quantifier } from "./Quantifier";

//Any class-specific resource like superiority die, rage charges, sorcery points, etc.
export type DomainClassResource = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
            Parent__DomainClass?: DomainClass,
            Parent__DomainSubClass?: DomainSubClass,
        },
        OneToMany: {}
    }
}>
