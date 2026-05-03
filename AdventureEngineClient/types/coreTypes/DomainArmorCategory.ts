import { ExtendedSchemaObject } from "../SchemaObject";
  
//light, medium, heavy, shield
export type DomainArmorCategory = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>