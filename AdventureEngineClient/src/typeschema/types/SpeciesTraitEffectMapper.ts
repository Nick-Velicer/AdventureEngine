import { ExtendedSchemaObject } from "../SchemaObject";

export type SpeciesTraitEffectMapper = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        trait__speciesTraitId: string
        effect__domainEffectQuantifierId: string
    }
}>
