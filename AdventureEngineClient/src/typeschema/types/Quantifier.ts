import { ExtendedSchemaObject } from "../SchemaObject";

export type Quantifier = ExtendedSchemaObject<{
    attributes: {
        quantity?: number
        delta?: number
        refreshOnShortRest?: boolean
        refreshOnLongRest?: boolean
        untilShortRest?: boolean
        untilLongRest?: boolean
        levelMinimumRequirement?: number
        levelMaximumRequirement?: number
        impactsSelf?: boolean
        intoInventory?: boolean
        isAction?: boolean
        isBonusAction?: boolean
        level1SpellSlots?: number
        level2SpellSlots?: number
        level3SpellSlots?: number
        level4SpellSlots?: number
        level5SpellSlots?: number
        level6SpellSlots?: number
        level7SpellSlots?: number
        level8SpellSlots?: number
        level9SpellSlots?: number
    }
    relationships: {
        //If this quantifier is related to some static effect (i.e. having darkvision or a buff from an item)
        effect__domainEffectId?: string
        //If this quantifier is related to the player taking an action (which could be reliant on an effect with its own quantifier)
        action__domainActionId?: string
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
