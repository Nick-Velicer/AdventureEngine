import { ExtendedSchemaObject } from "../SchemaObject";

//Abjuration, Conjuration, Divination, Enchantment, Evocation, Illusion, Necromancy, and Transmutation
export type DomainSpellSchool = ExtendedSchemaObject<{
    Attributes: {
    }
    Relationships: {
        ManyToOne: {},
        OneToMany: {}
    }
}>
