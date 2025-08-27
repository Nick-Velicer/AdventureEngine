import { ExtendedSchemaObject } from "../SchemaObject";
import { Campaign } from "./Campaign";
import { CharacterDomainCharacterStatInstance } from "./CharacterDomainCharacterStatInstance";
import { DomainSize } from "./DomainSize";
import { DomainSpecies } from "./DomainSpecies";
import { DomainSubClass } from "./DomainSubClass";

export type Character = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: { 
            CurrentSize__domainSize?: DomainSize,
            Species__domainSpecies?: DomainSpecies,
            Subclass__domainSubClass?: DomainSubClass,
            Campaign__Campaign?: Campaign,
        },
        OneToMany: {
            Stats__CharacterDomainCharacterStatInstance?: CharacterDomainCharacterStatInstance[]
        }
    }
}>