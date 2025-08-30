import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainCreatureType } from "./DomainCreatureType";

export type DomainSpecies = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {  
            CreatureType__DomainCreatureType: DomainCreatureType
        },
        OneToMany: {}
    }
}>
