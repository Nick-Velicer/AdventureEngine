import { ExtendedSchemaObject } from "../SchemaObject";

//Any entity-ish traits that we want to address or modify on an effect like a spell or class effect.
//Allows for things like casting time, end triggers, or target amount to be modified.
//These should be pretty much entirely numeric, which significantly reduces the amount of
//"hard-coded" numeric values on Quantifiers and keeps them as mostly meta-flag nodes

export type DomainEffectStat = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>
