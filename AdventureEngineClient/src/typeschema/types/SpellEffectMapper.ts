import { ExtendedSchemaObject } from "../SchemaObject";

export type SpellEffectMapper = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        spell__DomainSpellId: string
        effect__effectQuantifierId: string
    }
}>
