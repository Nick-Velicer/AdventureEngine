import { ExtendedSchemaObject } from "../SchemaObject";
import { Campaign } from "./Campaign";
import { CharacterDomainCharacterStatInstance } from "./CharacterDomainCharacterStatInstance";
import { CharacterDomainSubClassInstance } from "./CharacterDomainSubClassInstance";
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
            Campaign__Campaign?: Campaign,
        },
        OneToMany: {
            SubClasses__CharacterDomainSubClassInstance?: CharacterDomainSubClassInstance[],
            Stats__CharacterDomainCharacterStatInstance?: CharacterDomainCharacterStatInstance[]
        }
    }
}>