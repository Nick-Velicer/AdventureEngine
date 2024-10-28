import { ExtendedSchemaObject } from "../SchemaObject";

export type SpeciesTraitMapper = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        species__domainSpeciesId: string
        effect__speciesTraitEffectMapperId: string
    }
}>
