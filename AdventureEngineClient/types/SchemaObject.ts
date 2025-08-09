import { MergeDeep } from "type-fest"


export type BaseAttributes = {
    Title?: string
    Description?: string
    IsActive?: boolean
}

type SchemaObject = {
    Id: number | undefined,
    Attributes: Record<string, any>,
    Relationships: Record<string, SchemaObject>,
}

//For extension for the core object types to recieve common fields
export type ExtendedSchemaObject<T extends {
    Attributes: Record<string, any>
    Relationships: Record<string, SchemaObject>
}> = {
    Id: number | undefined,
    Attributes: BaseAttributes & T["Attributes"],
    Relationships: T["Relationships"],
}

//MergeDeep is used here since a regular object union will result in the schemas being unions of properties, instead of one single property list
export type FlattenedSchemaObject<T extends SchemaObject> = MergeDeep<MergeDeep<{ id: T["Id"] }, T["Attributes"]>, {[key in keyof T["Relationships"]]: number | undefined}>