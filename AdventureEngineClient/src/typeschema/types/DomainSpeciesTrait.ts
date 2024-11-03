import { ExtendedSchemaObject } from "../SchemaObject";

export type DomainSpeciesTrait = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        species__domainSpeciesId: string
        effect__speciesTraitEffectMapperId: string
    }
}>
