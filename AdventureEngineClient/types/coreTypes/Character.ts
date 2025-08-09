import { ExtendedSchemaObject } from "../SchemaObject";
import { Campaign } from "./Campaign";
import { DomainSize } from "./DomainSize";
import { DomainSpecies } from "./DomainSpecies";
import { DomainSubClass } from "./DomainSubClass";

export type Character = ExtendedSchemaObject<{
    attributes: {
    },
    relationships: {
        currentSize__domainSize?: DomainSize,
        species__domainSpecies?: DomainSpecies,
        subclass__domainSubClass?: DomainSubClass,
        campaign__Campaign?: Campaign,
    }
}>