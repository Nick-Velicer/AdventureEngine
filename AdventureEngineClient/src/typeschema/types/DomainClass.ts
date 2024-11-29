import { ExtendedSchemaObject } from "../SchemaObject";

export type DomainClass = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        hitDie__domainDiceId: string
        spellcastingStat__domainCharacterStatId?: string
    }
}>
