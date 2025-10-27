import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainAction } from "./DomainAction";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainClass } from "./DomainClass";
import { DomainClassTrait } from "./DomainClassTrait";
import { DomainCondition } from "./DomainCondition";
import { DomainDamageType } from "./DomainDamageType";
import { DomainDiceRollSubType } from "./DomainDiceRollSubType";
import { DomainDiceRollType } from "./DomainDiceRollType";
import { DomainSpell } from "./DomainSpell";
import { DomainStaticEffect } from "./DomainStaticEffect";
import { DomainSubClass } from "./DomainSubClass";

export type Quantifier = ExtendedSchemaObject<{
    Attributes: {
        //Whether or not this ends up overriding another quantifier with it's non-null values from some conditional mapping
        ShouldBeEvaluatedAsModifier?: boolean,
        //Such a value/property now becomes this
        HardSetQuantity?: number,
        HardSetPercentage?: number,
        DeltaQuantity?: number,
        DeltaPercentage?: number,
        RefreshOnShortRest?: boolean,
        RefreshOnLongRest?: boolean,
        UntilShortRest?: boolean,
        UntilLongRest?: boolean,
        QuantityRestoredOnShortRest?: number,
        LevelMinimumRequirement?: number,
        LevelMaximumRequirement?: number,
        TargetMinimum?: number,
        TargetMaximum?: number,
        AppliesToSource?: boolean, 
        AppliesToTargets?: boolean,
        //If any other entities should have this effect when engaging with the specific entity context (e.g. all enemies have advantage on attack rolls against source/target)
        AppliesAgainstSource?: boolean,
        AppliesAgainstTargets?: boolean,
        //If only the specific source/target should be counted for the quantifier calculation (e.g. a charmed entity has disabled attack roles against the source)
        AppliesAgainstSourceForTargetsOnly?: boolean,
        AppliesAgainstTargetsForSourceOnly?: boolean,
        GivesAdvantage?: boolean,
        GivesDisadvantage?: boolean,
        AutomaticFailure?: boolean,
        Prevents?: boolean,
        IntoInventory?: boolean,
        IsAction?: boolean,
        IsBonusAction?: boolean,
        GivesAction?: boolean,
        ImpactsMovementAmount?: boolean,
        GivesBonusAction?: boolean,
        Level1SpellSlots?: number,
        Level2SpellSlots?: number,
        Level3SpellSlots?: number,
        Level4SpellSlots?: number,
        Level5SpellSlots?: number,
        Level6SpellSlots?: number,
        Level7SpellSlots?: number,
        Level8SpellSlots?: number,
        Level9SpellSlots?: number,
    },
    Relationships: {
        ManyToOne: {
            //Keys for quantifiers owned by effects, class traits, etc.
            Parent__DomainAction?: DomainAction,
            Parent__DomainStaticEffect?: DomainStaticEffect,
            Parent__DomainCondition?: DomainCondition,
            Parent__DomainClassTrait?: DomainClassTrait,
            Parent__DomainSubClass?: DomainSubClass,
            Parent__DomainClass?: DomainClass,

            //Keys for other effects or targets that a quantifier may have (distinguished from what their source node is)
            Target__DomainStaticEffect?: DomainStaticEffect,
            Target__DomainCharacterStat?: DomainCharacterStat,
            Target__DomainDiceRollType?: DomainDiceRollType,
            Target__DomainDiceRollSubType?: DomainDiceRollSubType,
            Target__DomainAction?: DomainAction,
            Target__DomainSpell?: DomainSpell,
            Target__DomainCondition?: DomainCondition,
            Target__DomainDamageType?: DomainDamageType,
        },
        OneToMany: {}
    }
}>
