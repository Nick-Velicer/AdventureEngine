import { ExtendedSchemaObject } from "../SchemaObject";
import { UserRoleInstance } from "./UserRoleInstance";

export type User = ExtendedSchemaObject<{
    Attributes: {
        Username?: string
        Password?: string
    },
    Relationships: {
        ManyToOne: {},
        OneToMany: {
            Roles__UserRoleInstance?: UserRoleInstance[]
        }
    }
}>