import { ExtendedSchemaObject } from "../SchemaObject";
  
//Checks for conditional evaluations (is something equipped, is somebody incapacitated)
export type DomainBooleanCondition = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
        },
        OneToMany: {
        }
    }
}>