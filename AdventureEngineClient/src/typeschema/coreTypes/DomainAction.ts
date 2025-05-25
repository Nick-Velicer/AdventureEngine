import { ExtendedSchemaObject } from "../SchemaObject";

//Attack, help, disengage, etc.
export type DomainAction = ExtendedSchemaObject<{
    attributes: {
        usesAction?: boolean,
        usesBonusAction?: boolean,
    },
    relationships: {
    }
}>
