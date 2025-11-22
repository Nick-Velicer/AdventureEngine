import { ExtendedSchemaObject} from "../SchemaObject";
  
export type Campaign = ExtendedSchemaObject<{
    Attributes: {
        Notes: string
    },
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>