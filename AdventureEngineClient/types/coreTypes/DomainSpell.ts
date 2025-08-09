import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainDice } from "./DomainDice";
import { DomainSpellSchool } from "./DomainSpellSchool";

export type DomainSpell = ExtendedSchemaObject<{
    attributes: {
        materialComponent?: string
        somaticComponent?: string
        verbalComponent?: string
        isRanged?: boolean
        isMelee?: boolean
        isRitual?: boolean
        concentrationRequired?: boolean
        roundDuration?: number
        hourDuration?: number
        isCantrip?: boolean
        level?: number
        isAction?: boolean
        isBonusAction?: boolean
        minuteCastTime?: number
        hourCastTime?: number
    }
    relationships: {
        school__domainSpellSchool?: DomainSpellSchool
        damageScaling__domainDice?: DomainDice
    }
}>
