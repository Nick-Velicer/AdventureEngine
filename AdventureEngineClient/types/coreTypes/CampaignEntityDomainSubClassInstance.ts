import { ExtendedSchemaObject } from "../SchemaObject";
import { CampaignEntity } from "./CampaignEntity";
import { DomainEntityStat } from "./DomainEntityStat";
import { DomainSubClass } from "./DomainSubClass";
  
export type CampaignEntityDomainSubClassInstance = ExtendedSchemaObject<{
    Attributes: {
        Level: number
    },
    Relationships: {
        ManyToOne: {
            CampaignEntity__CampaignEntity: CampaignEntity,
            SubClass__DomainSubClass: DomainSubClass
        },
        OneToMany: {}
    }
}>