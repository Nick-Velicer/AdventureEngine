import { ExtendedSchemaObject } from "../SchemaObject";

//Small, large, massive, 
export type DomainSize = ExtendedSchemaObject<{
    attributes: {
        sizeOrder: number,
        //these may be overridden by a character's specific size stat, but are available default dimensions for each size
        baseTileArea: number,
        baseHexArea: number,
    }
    relationships: {
    }
}>
