import { ExtendedSchemaObject } from "../SchemaObject";

export type EffectQuantifier = ExtendedSchemaObject<{
    attributes: {
        amountAvailable?: number
        effectQuantity?: number
        effectDelta?: number
        refreshOnShortRest?: boolean
        refreshOnLongRest?: boolean
        untilShortRest?: boolean
        untilLongRest?: boolean
        levelMinimum?: number
        levelMaximum?: number
        impactsSelf?: boolean
        intoInventory?: boolean
    }
    relationships: {
        effect__domainEffectId?: string
        target__domainCharacterSkillId?: string
        target__domainCharacterStatId?: string
        addedSpell__domainSpellId?: string
        condition__domainConditionId?: string
        damageType__domainDamageTypeId?: string
        resistanceType__domainDamageTypeId?: string
        save__domainCharacterStatId?: string
        item__domainItemId?: string
        dice__domainDiceId?: string
    }
}>
