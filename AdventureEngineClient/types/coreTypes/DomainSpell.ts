import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainDice } from "./DomainDice";
import { DomainSpellSchool } from "./DomainSpellSchool";

export type DomainSpell = ExtendedSchemaObject<{
    Attributes: {
        MaterialComponent?: string
        HasSomaticRequirement?: boolean
        HasVerbalRequirement?: boolean
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
            School__DomainSpellSchool?: DomainSpellSchool
            DamageScaling__DomainDice?: DomainDice
        },
        OneToMany: {}
    }
}>
