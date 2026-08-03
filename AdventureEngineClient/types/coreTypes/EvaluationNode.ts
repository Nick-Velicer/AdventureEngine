import { ExtendedSchemaObject } from "../SchemaObject";
import { Quantifier } from "./Quantifier";
import { DomainOperator } from "./DomainOperator";


export type EvaluationNode = ExtendedSchemaObject<{
    Attributes: {},
    Relationships: {
        ManyToOne: {
            Operator__DomainOperator: DomainOperator,
            Parent__EvaluationNode: EvaluationNode,
            Parent__Quantifier: Quantifier,
        },
        OneToMany: {
            Operands__EvaluationNode: EvaluationNode[],
            Operands__Quantifier: Quantifier[]
        }
    }
}>