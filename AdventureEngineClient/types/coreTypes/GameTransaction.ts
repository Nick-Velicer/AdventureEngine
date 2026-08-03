import { ExtendedSchemaObject } from "../SchemaObject";
import { CampaignEntity } from "./CampaignEntity";
import { DomainAction } from "./DomainAction";
import { DomainArmor } from "./DomainArmor";
import { DomainDice } from "./DomainDice";
import { DomainDiceRollSubType } from "./DomainDiceRollSubType";
import { DomainDiceRollType } from "./DomainDiceRollType";
import { DomainEntityStat } from "./DomainEntityStat";
import { DomainGameEvent } from "./DomainGameEvent";
import { DomainItem } from "./DomainItem";
import { DomainItemGroup } from "./DomainItemGroup";
import { DomainSpell } from "./DomainSpell";
import { DomainTool } from "./DomainTool";
import { DomainWeapon } from "./DomainWeapon";

//A structured way to track in-game instances of events, updates, and ocurrences triggered by the user

export type GameTransaction = ExtendedSchemaObject<{
    Attributes: {
        ProvidedRollValue?: number,
        //i.e. casting a spell at a certain level
        LevelValue?: number,
    },
    Relationships: {
        ManyToOne: {
            Source__CampaignEntity?: CampaignEntity,
            Action__DomainAction?: DomainAction,
            Event__DomainGameEvent?: DomainGameEvent,
            Roll__DomainDiceRollType?: DomainDiceRollType,
            Roll__DomainDiceRollSubType?: DomainDiceRollSubType,

            Focus__DomainSpell?: DomainSpell,
            Focus__DomainWeapon?: DomainWeapon,
            Focus__DomainArmor?: DomainArmor,
            Focus__DomainItem?: DomainItem,
            Focus__DomainItemGroup?: DomainItemGroup,
            Focus__DomainTool?: DomainTool,
            Focus__DomainDice?: DomainDice,
            Focus__DomainEntityStat?: DomainEntityStat,

            Parent__GameTransaction?: GameTransaction
        },
        OneToMany: {
            Children__GameTransaction?: GameTransaction[]
        }
    }
}>
