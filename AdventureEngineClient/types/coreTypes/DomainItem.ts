import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainItemGroup } from "./DomainItemGroup";
import { Quantifier } from "./Quantifier";

export type DomainItem = ExtendedSchemaObject<{
    Attributes: {

    },
    Relationships: {
        ManyToOne: {
            ItemGroup__DomainItemGroup: DomainItemGroup
        },
        OneToMany: {}
    }
}>
