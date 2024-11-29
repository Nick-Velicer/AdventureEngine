import { ExtendedSchemaObject } from "../SchemaObject";

export type DomainAction = ExtendedSchemaObject<{
    attributes: {
        usesAction?: boolean
        usesBonusAction?: boolean
    }
    relationships: {
    }
}>
