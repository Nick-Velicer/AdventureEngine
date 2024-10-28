import { ExtendedSchemaObject } from "../SchemaObject";

export type EffectInstanceMapper = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        character__characterId: string
        effect__domainEffectQuantifierId: string
    }
}>
