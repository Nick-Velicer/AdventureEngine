import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainDice } from "./DomainDice";
import { DomainSpellSchool } from "./DomainSpellSchool";

export type DomainSpell = ExtendedSchemaObject<{
    Attributes: {
        MaterialComponent?: string
        SomaticComponent?: string
        VerbalComponent?: string
        IsRanged?: boolean
        IsMelee?: boolean
        IsRitual?: boolean
        ConcentrationRequired?: boolean
        RoundDuration?: number
        HourDuration?: number
        IsCantrip?: boolean
        Level?: number
        IsAction?: boolean
        IsBonusAction?: boolean
        MinuteCastTime?: number
        HourCastTime?: number
    }
    Relationships: {
        ManyToOne: {
            School__domainSpellSchool?: DomainSpellSchool
            DamageScaling__domainDice?: DomainDice
        }
    }
}>
