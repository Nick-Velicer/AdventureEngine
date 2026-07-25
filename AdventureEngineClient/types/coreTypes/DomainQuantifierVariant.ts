import { ExtendedSchemaObject } from "../SchemaObject";
import { Quantifier } from "./Quantifier";

//All possible game entry points for a quantifier as an evaluated effect, player action, etc.
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
