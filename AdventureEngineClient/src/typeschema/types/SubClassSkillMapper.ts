import { ExtendedSchemaObject } from "../SchemaObject";

export type SubClassSkillMapper = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
        subclass__domainSubClassId?: string
        skill__domainCharacterSkillId?: string
    }
}>
