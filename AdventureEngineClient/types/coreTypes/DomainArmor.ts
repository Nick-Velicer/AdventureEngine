import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainArmorCategory } from "./DomainArmorCategory";
import { DomainWeaponDomainWeaponCategoryInstance } from "./DomainWeaponDomainWeaponCategoryInstance";
  
//Bagpipes, glassblowers tools, disguise kit, etc.
export type DomainArmor = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
            Category__DomainArmorCategory: DomainArmorCategory
        },
        OneToMany: {
        }
    }
}>