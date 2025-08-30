import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainCondition } from "./DomainCondition";
import { DomainDamageType } from "./DomainDamageType";
import { DomainSpell } from "./DomainSpell";
import { DomainStaticEffect } from "./DomainStaticEffect";

export type Quantifier = ExtendedSchemaObject<{
    Attributes: {
        Quantity?: number
        Delta?: number
        RefreshOnShortRest?: boolean
        RefreshOnLongRest?: boolean
        UntilShortRest?: boolean
        UntilLongRest?: boolean
        LevelMinimumRequirement?: number
        LevelMaximumRequirement?: number
        ImpactsSelf?: boolean
        IntoInventory?: boolean
        IsAction?: boolean
        IsBonusAction?: boolean
        Level1SpellSlots?: number
        Level2SpellSlots?: number
        Level3SpellSlots?: number
        Level4SpellSlots?: number
        Level5SpellSlots?: number
        Level6SpellSlots?: number
        Level7SpellSlots?: number
        Level8SpellSlots?: number
        Level9SpellSlots?: number
    }
    Relationships: {
        ManyToOne: {
            Effect__domainStaticEffect?: DomainStaticEffect
            Target__domainCharacterStat?: DomainCharacterStat
            AddedSpell__domainSpell?: DomainSpell
            Condition__domainCondition?: DomainCondition
            DamageType__domainDamageType?: DomainDamageType
            ResistanceType__domainDamageType?: DomainDamageType
            Save__domainCharacterStat?: DomainCharacterStat
        },
        OneToMany: {}
    }
}>
