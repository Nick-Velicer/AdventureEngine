import { ExtendedSchemaObject } from "../SchemaObject";

//Attack, help, disengage, etc.
export type DomainAction = ExtendedSchemaObject<{
    Attributes: {
        UsesAction?: boolean,
        UsesBonusAction?: boolean,
    },
    Relationships: {
    }
}>
