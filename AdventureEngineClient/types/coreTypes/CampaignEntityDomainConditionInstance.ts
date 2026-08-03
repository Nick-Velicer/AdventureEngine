import { ExtendedSchemaObject } from "../SchemaObject";
import { CampaignEntity } from "./CampaignEntity";
import { DomainCondition } from "./DomainCondition";
import { Quantifier } from "./Quantifier";

//An instance of application of a condition to a character (by a potential owner of the effect)
export type CampaignEntityDomainConditionInstance = ExtendedSchemaObject<{
    Attributes: {
        //Could be more structured eventually, but will just be used for a title comparison for now
        Source: string,
        Target: string,
    },
    Relationships: {
        ManyToOne: {
            CampaignEntity__CampaignEntity: CampaignEntity,
            Condition__DomainCondition?: DomainCondition
        },
        OneToMany: {}
    }
}>
