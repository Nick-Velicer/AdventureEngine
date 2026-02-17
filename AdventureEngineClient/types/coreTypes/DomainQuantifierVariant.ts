import { ExtendedSchemaObject } from "../SchemaObject";
import { Quantifier } from "./Quantifier";

//All possible game entry points for a quantifier as a static effect, triggered effect, player action
export type DomainQuantifierVariant = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
        },
        OneToMany: {
        }
    }
}>
