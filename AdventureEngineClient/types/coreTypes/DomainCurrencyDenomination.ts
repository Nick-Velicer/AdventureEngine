import { ExtendedSchemaObject } from "../SchemaObject";

//e.g. gold pieces, silver pieces, copper, etc...
export type DomainCurrencyDenomination = ExtendedSchemaObject<{
    Attributes: {
        IsLowestDenomination: boolean
        MultipleOfLowestDenomination: number
    },
    Relationships: {
        ManyToOne: {
        },
        OneToMany: {
        }
    }
}>
