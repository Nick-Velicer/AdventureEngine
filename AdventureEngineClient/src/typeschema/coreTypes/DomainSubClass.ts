import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainClass } from "./DomainClass";

//3rd Level (usually) subvariants that give specific level benefits
export type DomainSubClass = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        parentClass__domainClass?: DomainClass
    }
}>
