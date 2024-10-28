import { ExtendedSchemaObject } from "../SchemaObject";

export type DomainSpecies = ExtendedSchemaObject<{
    attributes: {
        baseSpeed?: number
    }
    relationships: {
        size__domainSizeId?: string
        type__domainCreatureTypeId?: string
    }
}>
