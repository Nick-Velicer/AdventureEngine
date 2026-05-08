import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainClass } from "./DomainClass";
import { DomainLanguage } from "./DomainLanguage";
import { DomainSkill } from "./DomainSkill";
import { DomainSubClass } from "./DomainSubClass";
import { DomainToolCategory } from "./DomainToolCategory";
import { DomainWeaponCategory } from "./DomainWeaponCategory";

//A pseudo-mapping table for selectable proficiency options for classes,
//subclasses, feats, etc.
export type DomainProficiencyOption = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {
            Parent__DomainClass?: DomainClass,
            Parent__DomainSubClass?: DomainSubClass,
            //Add character species/race whenever that gets added
            Option__DomainSkill?: DomainSkill,
            Option__DomainWeaponCategory?: DomainWeaponCategory,
            Option__DomainToolCategory?: DomainToolCategory,
            Option__DomainLanguage?: DomainLanguage
        },
        OneToMany: {}
    }
}>