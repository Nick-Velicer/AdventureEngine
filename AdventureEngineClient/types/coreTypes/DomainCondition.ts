import { ExtendedSchemaObject } from "../SchemaObject";
import { Quantifier } from "./Quantifier";

//Any "character IS effect", i.e. frightened, charmed, surprised, also any auxiliary effects like "is wearing heavy armor" that impact quantifiers
export type DomainCondition = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {},
        OneToMany: {
            Quantifiers__Quantifier?: Quantifier[],
        }
    }
}>
