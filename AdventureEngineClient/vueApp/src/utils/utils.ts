import type { SchemaObject } from "../../../types/SchemaObject";

export function flattenSchemaObject(object: SchemaObject) {
    console.log(object);
    return {
        Id: object.Id,
        ...object.Attributes,
        ...Object.fromEntries(Object.keys(object.Relationships.ManyToOne).map(fkName => [fkName, object.Relationships.ManyToOne[fkName]?.Id])) 
    }
}