import { ExtendedSchemaObject } from "../SchemaObject";

//We don't really need to store any information beyond a name right now for testing
export type User = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>