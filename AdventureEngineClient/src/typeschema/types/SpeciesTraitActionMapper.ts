import { ExtendedSchemaObject } from "../SchemaObject";

export type SpeciesTraitActionMapper = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        trait__speciesTraitId: string
        action__domainActionId: string
    }
}>
