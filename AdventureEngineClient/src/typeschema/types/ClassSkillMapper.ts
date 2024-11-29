import { ExtendedSchemaObject } from "../SchemaObject";

export type ClassSkillMapper = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        class__domainClassId?: string
        skill__domainCharacterSkillId?: string
    }
}>
