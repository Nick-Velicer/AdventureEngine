import { ExtendedSchemaObject } from "../SchemaObject";

export type DomainSpecies = ExtendedSchemaObject<{
    attributes: {
        baseSpeed?: number
        isRemovable?: boolean
    }
    relationships: {
        size__domainSizeId?: string
        type__domainCreatureTypeId?: string
        variantOf__domainSpeciesId?: string
    }
}>
