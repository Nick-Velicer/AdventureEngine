import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainWeaponDomainWeaponCategoryInstance } from "./DomainWeaponDomainWeaponCategoryInstance";
  
//Ranged, melee, simple, martial, finesse, etc.
export type DomainWeapon = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
        },
        OneToMany: {
            Categories__DomainWeaponDomainWeaponCategoryInstance: DomainWeaponDomainWeaponCategoryInstance[]
        }
    }
}>