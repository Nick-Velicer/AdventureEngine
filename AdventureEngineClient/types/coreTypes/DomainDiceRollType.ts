import { ExtendedSchemaObject } from "../SchemaObject";
import { DomainDiceRollSubType } from "./DomainDiceRollSubType";

//Attack, Damage, Initiative, Save rolls (subvariants are in DomainDiceRollType for more specific situational checks)

export type DomainDiceRollType = ExtendedSchemaObject<{
    Attributes: {
    },
    Relationships: {
        ManyToOne: {},
        OneToMany: {
            Variants__DomainDiceRollSubType: DomainDiceRollSubType[]
        }
    }
}>
