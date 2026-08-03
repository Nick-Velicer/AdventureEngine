import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainAction } from "./DomainAction";
import { DomainEntityStat } from "./DomainEntityStat";
import { DomainClass } from "./DomainClass";
import { DomainClassTrait } from "./DomainClassTrait";
import { DomainCondition } from "./DomainCondition";
import { DomainDamageType } from "./DomainDamageType";
import { DomainDice } from "./DomainDice";
import { DomainDiceRollSubType } from "./DomainDiceRollSubType";
import { DomainDiceRollType } from "./DomainDiceRollType";
import { DomainQuantifierVariant } from "./DomainQuantifierVariant";
import { DomainSpell } from "./DomainSpell";
import { DomainStaticEffect } from "./DomainStaticEffect";
import { DomainSubClass } from "./DomainSubClass";
import { DomainWeapon } from "./DomainWeapon";
import { DomainCurrencyDenomination } from "./DomainCurrencyDenomination";
import { DomainWeaponCategory } from "./DomainWeaponCategory";
import { DomainSkill } from "./DomainSkill";
import { DomainLanguage } from "./DomainLanguage";
import { DomainModifierMechanic } from "./DomainModifierMechanic";
import { CampaignEntityDomainSubClassInstance } from "./CampaignEntityDomainSubClassInstance";
import { DomainArmor } from "./DomainArmor";
import { DomainClassLevelAddition } from "./DomainClassLevelAddition";
import { DomainItem } from "./DomainItem";
import { DomainItemGroup } from "./DomainItemGroup";
import { EvaluationNode } from "./EvaluationNode";
import { DomainGameEvent } from "./DomainGameEvent";
import { DomainEffectStat } from "./DomainEffectStat";

export type Quantifier = ExtendedSchemaObject<{
    Attributes: {
        //Whether or not this ends up overriding another quantifier with it's non-null values from some conditional mapping
        ShouldReplace?: boolean,
        //Such a value/property now becomes this, kept outside of the effect stats as we need this to modify targets numerically
        HardSetQuantity?: number,
        HardSetPercentage?: number,
        DeltaQuantity?: number,
        DeltaPercentage?: number,
        //Same as above, but if we should read from the target property on a character or domain instead of having a hard-coded number
        HardSetTargetValue?: boolean,
        DeltaTargetValue?: boolean,
        //In case the quantifier should be checked against the most recent event/trigger's values
        //instead of a specific entity, this can be made a domain table if there are 
        //enough demonstrated separate evaluation contexts, but a flag is fine for now
        ApplyToCurrentEventContext?: boolean,
        AppliesToSource?: boolean, 
        AppliesToTargets?: boolean,
        //If any other entities should have this effect when engaging with the specific entity context (e.g. all enemies have advantage on attack rolls against source/target)
        AppliesAgainstSource?: boolean,
        AppliesAgainstTargets?: boolean,
        //If only the specific source/target should be counted for the quantifier calculation (e.g. a charmed entity has disabled attack roles against the source)
        AppliesAgainstSourceForTargetsOnly?: boolean,
        AppliesAgainstTargetsForSourceOnly?: boolean,
        //If this is meta-information about the effect itself, like modification to casting time or time to end
        AppliesToEffect?: boolean,
        AutomaticFailure?: boolean,
        AutomaticCritical?: boolean,
        PreventsReceiving?: boolean,
        PreventsApplying?: boolean,
        Gives?: boolean,
        Removes?: boolean,
        //A flag mostly for evaluation, if a context should be checked for having a target quality involved
        Uses?: boolean,
        RemovedOn?: boolean,
        GivesResistance?: boolean,
        IntoInventory?: boolean,
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
            Parent__DomainWeapon?: DomainWeapon,
            Parent__DomainCurrencyDenomination?: DomainCurrencyDenomination,
            Parent__CampaignEntityDomainSubClassInstance?: CampaignEntityDomainSubClassInstance,
            Parent__DomainArmor?: DomainArmor,
            Parent__DomainClassLevelAddition?: DomainClassLevelAddition,
            Parent__DomainItem?: DomainItem,
            Parent__DomainItemGroup?: DomainItemGroup,
            Parent__EvaluationNode?: EvaluationNode,
            Parent__Quantifier?: Quantifier,

            //Keys for other effects or targets that a quantifier may have (distinguished from what their source node is)
            Target__DomainStaticEffect?: DomainStaticEffect,
            Target__DomainEntityStat?: DomainEntityStat,
            Target__DomainDice?: DomainDice,
            Target__DomainDiceRollType?: DomainDiceRollType,
            Target__DomainDiceRollSubType?: DomainDiceRollSubType,
            Target__DomainAction?: DomainAction,
            Target__DomainSpell?: DomainSpell,
            Target__DomainCondition?: DomainCondition,
            Target__DomainDamageType?: DomainDamageType,
            Target__DomainCurrencyDenomination?: DomainCurrencyDenomination,
            Target__DomainWeaponCategory?: DomainWeaponCategory,
            Target__DomainSkill?: DomainSkill,
            Target__DomainLanguage?: DomainLanguage,
            Target__DomainModifierMechanic?: DomainModifierMechanic,
            Target__DomainEffectStat?: DomainEffectStat,
            //If there is no trigger set, assume it is to be evaluated statically
            Trigger__DomainAction?: DomainAction,
            Trigger__DomainCondition?: DomainCondition,
            Trigger__DomainGameEvent?: DomainGameEvent,
            Variant__DomainQuantifierVariant?: DomainQuantifierVariant,
        },
        OneToMany: {
            //Any boolean or numeric expression entry points
            EvaluationTree__EvaluationNode?: EvaluationNode[],
            //Allow for grouping effects under a conditional or trigger
            Children__Quantifier?: Quantifier[],
        }
    }
}>
