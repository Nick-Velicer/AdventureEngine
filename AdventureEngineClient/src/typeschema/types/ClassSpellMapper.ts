import { ExtendedSchemaObject } from "../SchemaObject";

export type ClassSpellMapper = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        class__domainClassId?: string
        spell__domainSpellId?: string
    }
}>
