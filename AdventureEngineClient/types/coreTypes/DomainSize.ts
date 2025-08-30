import { ExtendedSchemaObject } from "../SchemaObject";

//Small, large, massive, 
export type DomainSize = ExtendedSchemaObject<{
    Attributes: {
        SizeOrder: number,
        //these may be overridden by a character's specific size stat, but are available default dimensions for each size
        BaseTileArea: number,
        BaseHexArea: number,
    }
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>
