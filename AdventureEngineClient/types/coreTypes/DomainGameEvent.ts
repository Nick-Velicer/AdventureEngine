import { ExtendedSchemaObject } from "../SchemaObject";
import { Quantifier } from "./Quantifier";

//Game events and structure that exists separate from player choices (but can still be closely tied to them)
//i.e. damage received, damage taken, resource spent, resource gained, etc. These can also be things that
//we technically could encode in a conditional trigger, but don't expect a random effect to have to define how to 
//do and check for like "when you cause a saving throw to be made", we can just have that context be checked/emitted.
export type DomainGameEvent = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {},
        OneToMany: {
        }
    }
}>
