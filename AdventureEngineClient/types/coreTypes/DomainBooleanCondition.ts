import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainCondition } from "./DomainCondition";
  
//Checks for conditional evaluations (is something equipped, is somebody incapacitated)
//The default is to check for the character entity to meet the condition
export type DomainBooleanCondition = ExtendedSchemaObject<{
    Attributes: {
        //If the condition being evaluated should evaluate against
        //the targets of i.e. a spell or an attack
        //"If the attacked creature is wearing armor, such and such happens"
        appliesToSingleTarget: boolean,
        appliesToAllTargets: boolean,
    },
    Relationships: {
        ManyToOne: {
            Is__DomainCondition: DomainCondition
        },
        OneToMany: {
        }
    }
}>