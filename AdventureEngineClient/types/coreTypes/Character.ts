import { ExtendedSchemaObject } from "../SchemaObject";
import { Campaign } from "./Campaign";
import { DomainSize } from "./DomainSize";
import { DomainSpecies } from "./DomainSpecies";
import { DomainSubClass } from "./DomainSubClass";

export type Character = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        CurrentSize__domainSize?: DomainSize,
        Species__domainSpecies?: DomainSpecies,
        Subclass__domainSubClass?: DomainSubClass,
        Campaign__Campaign?: Campaign,
    }
}>