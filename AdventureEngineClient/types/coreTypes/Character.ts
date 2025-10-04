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
            CurrentSize__DomainSize?: DomainSize,
            Species__DomainSpecies?: DomainSpecies,
            Subclass__DomainSubClass?: DomainSubClass,
            Campaign__Campaign?: Campaign,
        },
        OneToMany: {
            Stats__CharacterDomainCharacterStatInstance?: CharacterDomainCharacterStatInstance[]
        }
    }
}>