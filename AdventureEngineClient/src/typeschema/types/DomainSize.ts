import { ExtendedSchemaObject } from "../SchemaObject";

export type DomainSize = ExtendedSchemaObject<{
    attributes: {
        tileArea: number
        hexArea: number
    }
    relationships: {
    }
}>
