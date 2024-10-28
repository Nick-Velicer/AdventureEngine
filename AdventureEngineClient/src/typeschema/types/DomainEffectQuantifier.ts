import { ExtendedSchemaObject } from "../SchemaObject";

export type DomainEffectQuantifier = ExtendedSchemaObject<{
    attributes: {
        amountAvailable?: number
        effectQuantity?: number
        effectDelta?: number
        refreshOnShortRest?: boolean
        refreshOnLongRest?: boolean
        levelMinimum?: number
        levelMaximum?: number
    }
    relationships: {
        effect__domainEffectId?: string
        target__domainCharacterSkillId?: string
        target__domainCharacterStatId?: string
    }
}>
