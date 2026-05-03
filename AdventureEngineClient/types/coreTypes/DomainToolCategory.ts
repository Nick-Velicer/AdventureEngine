import { ExtendedSchemaObject } from "../SchemaObject";
  
//musical instrument, artisan's tools, etc.
export type DomainToolCategory = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>