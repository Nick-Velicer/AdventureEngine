import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainCreatureType } from "./DomainCreatureType";

export type DomainSpecies = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        CreatureType__DomainCreatureType: DomainCreatureType
    }
}>
