import { ExtendedSchemaObject } from "../SchemaObject";

export type CharacterEffectMapper = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        character__characterId: string
        effect__quantifierId: string
    }
}>
