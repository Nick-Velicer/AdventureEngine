import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainAppRole } from "./DomainAppRole";
import { User } from "./User";

export type UserRoleInstance = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
            User__User: User,
            Role__DomainAppRole: DomainAppRole
        },
        OneToMany: {}
    }
}>