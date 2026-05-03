import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainToolCategory } from "./DomainToolCategory";
import { DomainWeaponDomainWeaponCategoryInstance } from "./DomainWeaponDomainWeaponCategoryInstance";
  
//Bagpipes, glassblowers tools, disguise kit, etc.
export type DomainTool = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
            Category__DomainToolCategory?: DomainToolCategory
        },
        OneToMany: {
        }
    }
}>