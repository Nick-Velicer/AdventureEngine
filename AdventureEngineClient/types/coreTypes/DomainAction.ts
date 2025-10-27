import { ExtendedSchemaObject } from "../SchemaObject";
import { Quantifier } from "./Quantifier";

//This encompasses available player choices like move/climb as well as formal actions like attack, help, disengage, etc.
export type DomainAction = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {},
        OneToMany: {
            Quantifiers__Quantifier?: Quantifier[]
        }
    }
}>
