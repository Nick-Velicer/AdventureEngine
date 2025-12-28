import { ExtendedSchemaObject } from "../SchemaObject";

export type User = ExtendedSchemaObject<{
    Attributes: {
        Username?: string
        Password?: string
    },
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>