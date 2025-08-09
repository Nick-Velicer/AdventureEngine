import { ExtendedSchemaObject } from "../SchemaObject";

//d6, d8, d100, any desired dice
export type DomainDice = ExtendedSchemaObject<{
    attributes: {
        minimum: number,
        maximum: number,
    },
    relationships: {
    }
}>
