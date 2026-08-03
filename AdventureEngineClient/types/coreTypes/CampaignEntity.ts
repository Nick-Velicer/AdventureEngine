import { ExtendedSchemaObject } from "../SchemaObject";
import { Campaign } from "./Campaign";
import { CampaignEntityDomainEntityStatInstance } from "./CampaignEntityDomainEntityStatInstance";
import { CampaignEntityDomainSubClassInstance } from "./CampaignEntityDomainSubClassInstance";
import { DomainSize } from "./DomainSize";
import { DomainSpecies } from "./DomainSpecies";
import { DomainSubClass } from "./DomainSubClass";

export type CampaignEntity = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: { 
            CurrentSize__DomainSize?: DomainSize,
            Species__DomainSpecies?: DomainSpecies,
            Campaign__Campaign?: Campaign,
        },
        OneToMany: {
            SubClasses__CampaignEntityDomainSubClassInstance?: CampaignEntityDomainSubClassInstance[],
            Stats__CampaignEntityDomainEntityStatInstance?: CampaignEntityDomainEntityStatInstance[]
        }
    }
}>