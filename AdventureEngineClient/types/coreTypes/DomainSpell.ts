import { ExtendedSchemaObject } from "../SchemaObject";
import { ClassSpell } from "./ClassSpell";
import { DomainDice } from "./DomainDice";
import { DomainSpellSchool } from "./DomainSpellSchool";

export type DomainSpell = ExtendedSchemaObject<{
    Attributes: {
        MaterialComponent?: string
        HasSomaticRequirement?: boolean
        HasVerbalRequirement?: boolean
        RangeFeet?: number
        RangeMiles?: number
        RequiresTouch?: boolean
        TargetsSelf?: boolean
        IsRitual?: boolean
        ConcentrationRequired?: boolean
        IsInstantaneous?: boolean
        RoundDuration?: number
        MinuteDuration?: number
        HourDuration?: number
        DayDuration?: number
        LastsUntilDispelled?: boolean
        IsCantrip?: boolean
        LevelRequirement?: number
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
        OneToMany: {
            Classes__ClassSpell: ClassSpell[]
        }
    }
}>
