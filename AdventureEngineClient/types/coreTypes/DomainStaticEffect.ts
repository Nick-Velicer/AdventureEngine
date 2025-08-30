import { ExtendedSchemaObject } from "../SchemaObject";

//Any "character HAS effect" i.e. character has darkvision, waterbreathing, etc.
export type DomainStaticEffect = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>
