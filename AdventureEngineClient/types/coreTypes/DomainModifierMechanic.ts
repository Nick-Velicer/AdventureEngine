import { ExtendedSchemaObject } from "../SchemaObject";

//Resistance, advantage, proficiency, disadvantage, anything that is a more complex mechanic that
//we need the engine to handle (but still want as a structured domain)
export type DomainModifierMechanic = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>
