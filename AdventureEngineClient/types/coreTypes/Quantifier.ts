import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainCondition } from "./DomainCondition";
import { DomainDamageType } from "./DomainDamageType";
import { DomainSpell } from "./DomainSpell";
import { DomainStaticEffect } from "./DomainStaticEffect";

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
        effect__domainStaticEffect?: DomainStaticEffect
        target__domainCharacterStat?: DomainCharacterStat
        addedSpell__domainSpell?: DomainSpell
        condition__domainCondition?: DomainCondition
        damageType__domainDamageType?: DomainDamageType
        resistanceType__domainDamageType?: DomainDamageType
        save__domainCharacterStat?: DomainCharacterStat
    }
}>
