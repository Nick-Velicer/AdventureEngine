import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainCreatureType } from "./DomainCreatureType";

export type DomainSpecies = ExtendedSchemaObject<{
    attributes: {
    },
    relationships: {
        creatureType__DomainCreatureType: DomainCreatureType
    }
}>
