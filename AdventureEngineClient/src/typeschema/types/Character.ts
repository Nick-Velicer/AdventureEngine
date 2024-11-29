import { ExtendedSchemaObject } from "../SchemaObject";

export type Character = ExtendedSchemaObject<{
    attributes: {
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number,
        gold: number,
        availableActions: number,
        availableBonusActions: number,
        baseWalkingSpeed: number,
        baseSwimmingSpeed: number,
    }
    relationships: {
        currentSize__domainSizeId?: string
        race__domainSpeciesId?: string
        subclass__domainSubClassId?: string
        campaignId?: string
    }
}>