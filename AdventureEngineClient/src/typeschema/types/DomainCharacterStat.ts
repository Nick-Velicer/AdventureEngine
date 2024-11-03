import { ExtendedSchemaObject } from "../SchemaObject";

//Even though this echos the character stat columns present on the Character entity
//this is used exclusively for spell/effect references as to keep the stat references
//for characters as local as possible without having a bunch of extra mapping involved
export type DomainCharacterStat = ExtendedSchemaObject<{
    attributes: {
    }
    relationships: {
    }
}>
