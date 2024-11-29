import { ExtendedSchemaObject } from "../SchemaObject";

export type SubClassSpellMapper = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        subclass__domainSubClassId?: string
        spell__domainSpellId?: string
    }
}>
