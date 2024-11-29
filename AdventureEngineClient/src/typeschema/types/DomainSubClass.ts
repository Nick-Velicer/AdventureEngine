import { ExtendedSchemaObject } from "../SchemaObject";

export type DomainSubClass = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        parentClass__domainClassId?: string
    }
}>
