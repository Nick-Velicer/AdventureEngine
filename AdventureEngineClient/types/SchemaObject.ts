import { Merge } from "type-fest"

export type BaseAttributes = {
    Title?: string
    AbbreviatedTitle?: string
    Description?: string
    IsActive?: boolean
}

export type SchemaObject = {
    Id: number | undefined,
    Attributes: Record<string, any>,
    //The typescript-json-schema library does not process conditional types correctly (for some reason
    //it defaults to the false case), hence the need to manually specify relationships that are 
    //one-to-many level vs. many-to-one level
    Relationships: {
        ManyToOne: Record<string, SchemaObject | undefined>,
        OneToMany: Record<string, SchemaObject[] | undefined>
    }
}

//For extension for the core object types to recieve common fields
export type ExtendedSchemaObject<T extends {
    Attributes: Record<string, any>
    Relationships: {
        ManyToOne: Record<string, SchemaObject | undefined >,
        OneToMany: Record<string, SchemaObject[] | undefined>
    }
}> = {
    Id: number | undefined,
    Attributes: BaseAttributes & T["Attributes"],
    Relationships: T["Relationships"],
}

//Merge is used here since a regular object union will result in the schemas being unions of properties, instead of one single property list
export type FlattenedSchemaObject<T extends SchemaObject> = (
    Merge<
        Merge<
            Merge<{ 
                Id: T["Id"] }, 
                T["Attributes"]
            >, 
        //We are cheating slightly with the foreign key flattening to let the Go side of things
        //parse out the intended meaning, otherwise the exported schemas completely explode
        //with nested type definitions if the actual types are produced here instead of FKs.
        {[key in keyof T["Relationships"]["ManyToOne"]]: number | undefined}>,
    {[key in keyof T["Relationships"]["OneToMany"]]: number[] | undefined}
    >)
    