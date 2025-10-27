import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainClass } from "./DomainClass";
import { DomainSubClass } from "./DomainSubClass";
import { Quantifier } from "./Quantifier";

//3rd Level (usually) subvariants that give specific level benefits
export type DomainClassTrait = ExtendedSchemaObject<{
    Attributes: {
    }
    Relationships: {
        ManyToOne: {  
            SubClass__DomainSubClass?: DomainSubClass,
            Class__DomainClass?: DomainClass,
        },
        OneToMany: {
            Quantifiers__Quantifier?: Quantifier[],
        }
    }
}>
