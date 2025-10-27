import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainDiceRollType } from "./DomainDiceRollType";

//Melee/ranged Weapon Attack rolls
    
//Melee/ranged Spell attack rolls
    
//Melee/ranged Weapon Damage rolls
    
//Melee/ranged Spell Damage rolls
    
//Initiative
    
//Ability checks/saves

export type DomainDiceRollSubType = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
            SuperType__DomainDiceRollType?: DomainDiceRollType
        },
        OneToMany: {}
    }
}>
