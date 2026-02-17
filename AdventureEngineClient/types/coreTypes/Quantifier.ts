import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainAction } from "./DomainAction";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainClass } from "./DomainClass";
import { DomainClassTrait } from "./DomainClassTrait";
import { DomainCondition } from "./DomainCondition";
import { DomainDamageType } from "./DomainDamageType";
import { DomainDiceRollSubType } from "./DomainDiceRollSubType";
import { DomainDiceRollType } from "./DomainDiceRollType";
import { DomainQuantifierVariant } from "./DomainQuantifierVariant";
import { DomainSpell } from "./DomainSpell";
import { DomainStaticEffect } from "./DomainStaticEffect";
import { DomainSubClass } from "./DomainSubClass";
import { EvaluatedConditional } from "./EvaluatedConditional";
import { QuantifierCostSpecifier } from "./QuantifierCostSpecifier";

export type Quantifier = ExtendedSchemaObject<{
    Attributes: {
        //Whether or not this ends up overriding another quantifier with it's non-null values from some conditional mapping
        ShouldReplace?: boolean,
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
        AutomaticCritical?: boolean,
        PreventsReceiving?: boolean,
        PreventsApplying?: boolean,
        Removes?: boolean,
        RemovedOn?: boolean,
        GivesResistance?: boolean,
        IntoInventory?: boolean,
        Range?: number,
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

            Variant__DomainQuantifierVariant?: DomainQuantifierVariant,
        },
        OneToMany: {
            //Costs paid for this quantifier (action, bonus action, movement, spell slot, etc.)
            Costs?: QuantifierCostSpecifier[],
            Conditions?: EvaluatedConditional[],
        }
    }
}>
