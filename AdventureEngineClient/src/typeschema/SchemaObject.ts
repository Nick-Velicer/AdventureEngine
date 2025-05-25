import { MergeDeep } from "type-fest"


export type BaseAttributes = {
    name?: string
    description?: string
    isActive?: boolean
}

type SchemaObject = {
    id: string | undefined,
    attributes: Record<string, any>,
    relationships: Record<string, SchemaObject>,
}

//For extension for the core object types to recieve common fields
export type ExtendedSchemaObject<T extends {
    attributes: Record<string, any>
    relationships: Record<string, SchemaObject>
}> = {
    id: string | undefined,
    attributes: BaseAttributes & T["attributes"],
    relationships: T["relationships"],
}

//MergeDeep is used here since a regular object union will result in the schemas being unions of properties, instead of one single property list
export type FlattenedSchemaObject<T extends SchemaObject> = MergeDeep<MergeDeep<{ id: T["id"] }, T["attributes"]>, {[key in keyof T["relationships"]]: string | undefined}>