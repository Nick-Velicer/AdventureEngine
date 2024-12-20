import { ExtendedSchemaObject } from "../SchemaObject";

export type DomainDice = ExtendedSchemaObject<{
    attributes: {
        minimum: number
        maximum: number
    }
    relationships: {
    }
}>
