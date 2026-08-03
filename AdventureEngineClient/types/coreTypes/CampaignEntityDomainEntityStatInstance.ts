import { ExtendedSchemaObject } from "../SchemaObject";
import { CampaignEntity } from "./CampaignEntity";
import { DomainEntityStat } from "./DomainEntityStat";
  
export type CampaignEntityDomainEntityStatInstance = ExtendedSchemaObject<{
    Attributes: {
        Value: number
    },
    Relationships: {
        ManyToOne: {
            CampaignEntity__CampaignEntity: CampaignEntity,
            Stat__DomainEntityStat: DomainEntityStat
        },
        OneToMany: {}
    }
}>