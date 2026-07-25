import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainArmorCategory } from "./DomainArmorCategory";
import { DomainWeaponDomainWeaponCategoryInstance } from "./DomainWeaponDomainWeaponCategoryInstance";
  
//operations possible for boolean and numeric evaluation
export type DomainOperator = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
        },
        OneToMany: {
        }
    }
}>