import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainItem } from "./DomainItem";
import { DomainItemGroup } from "./DomainItemGroup";
import { DomainTool } from "./DomainTool";
import { DomainWeapon } from "./DomainWeapon";

export type ItemDomainItemGroupInstance = ExtendedSchemaObject<{
    Attributes: {
        Quantity: number
    },
    Relationships: {
        ManyToOne: {
            Item__DomainItem: DomainItem,
            Item__DomainTool: DomainTool,
            Item__DomainWeapon: DomainWeapon,
            ItemGroup__DomainItemGroup: DomainItemGroup,
        },
        OneToMany: {
        }
    }
}>
