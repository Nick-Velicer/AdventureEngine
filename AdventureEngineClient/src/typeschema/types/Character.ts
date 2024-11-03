import { ExtendedSchemaObject } from "../SchemaObject";

export type Character = ExtendedSchemaObject<{
    attributes: {
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number,
        gold: number
    }
    relationships: {
        currentSize__domainSizeId?: string
        race__domainSpeciesId?: string
        campaignId?: string
    }
}>