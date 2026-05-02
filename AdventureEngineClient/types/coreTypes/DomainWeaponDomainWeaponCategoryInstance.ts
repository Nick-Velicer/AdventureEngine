import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainWeapon } from "./DomainWeapon";
import { DomainWeaponCategory } from "./DomainWeaponCategory";

export type DomainWeaponDomainWeaponCategoryInstance = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {
            Weapon__DomainWeapon: DomainWeapon,
            Category__DomainWeaponCategory: DomainWeaponCategory,
        },
        OneToMany: {
        }
    }
}>
