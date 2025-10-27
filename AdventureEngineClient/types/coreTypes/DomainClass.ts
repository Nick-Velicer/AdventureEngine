import { ExtendedSchemaObject } from "../SchemaObject";
import { ClassPrimaryAbility } from "./ClassPrimaryAbility";
import { ClassSave } from "./ClassSave";
import { DomainCharacterStat } from "./DomainCharacterStat";
import { DomainDice } from "./DomainDice";
import { DomainSubClass } from "./DomainSubClass";

//Cleric, Barbarian, Ranger, etc.
export type DomainClass = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
            HitDie__DomainDice: DomainDice,
            SpellcastingStat__DomainCharacterStat: DomainCharacterStat,
        },
        OneToMany: {
            PrimaryStats__ClassPrimaryAbility: ClassPrimaryAbility[],
            Saves__ClassSave: ClassSave[],
            SubClasses__DomainSubClass: DomainSubClass[]
        }
    }
}>
