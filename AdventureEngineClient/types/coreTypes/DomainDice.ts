import { ExtendedSchemaObject } from "../SchemaObject";

//d6, d8, d100, any desired dice
export type DomainDice = ExtendedSchemaObject<{
    Attributes: {
        Minimum: number,
        Maximum: number,
    },
    Relationships: {
    }
}>
