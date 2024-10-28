import { Normalize } from "../utils"

type SchemaObject = {
    id?: string
    attributes: {
        title?: string
        description?: string
    }
    relationships: Record<string, string>
}

export type ExtendedSchemaObject<T extends {
    attributes: any
    relationships: Record<string, string>
}> = Normalize<Partial<Required<SchemaObject>> & T>