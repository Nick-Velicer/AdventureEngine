//This implements utility types and conversions from type to url parameters.
//Since this is a meta-type utility, this is excluded from the app-level synchronization
//and communicates through URL params to try and prevent harder coupling through a custom interface.

import { type SchemaObject } from "../types/SchemaObject";

const filterOperators = [
    "==",
    "!=",
    "<",
    "<=",
    ">",
    "=>",
] as const;

type FilterOperator = typeof filterOperators[number];

type FilterableProperties<T extends SchemaObject> = keyof T["Attributes"] | keyof T["Relationships"]["ManyToOne"]

//Leaves of the filter AST
type FilterExpression<T extends SchemaObject> = {
    field: FilterableProperties<T>,
    operator: FilterOperator,
    filterValue: string
}

//Enforcing a minimum of two items for comparison operations
type ANDNode<T extends SchemaObject> = { "AND": [FilterAST<T>, FilterAST<T>, ...FilterAST<T>[]] };

type ORNode<T extends SchemaObject> = { "OR": [FilterAST<T>, FilterAST<T>, ...FilterAST<T>[]] };

type NOTNode<T extends SchemaObject> = { "NOT": FilterAST<T> };

//Tree structure of the filter AST, with boolean operators at each potential bifurcation.
//We are Currently only filtering on the root-level object until there is a demonstrated need for 
//further-nested filtering properties (i.e. filter where object.parent.parentProperty === someValue)
export type FilterAST<T extends SchemaObject> = FilterExpression<T> | ANDNode<T> | ORNode<T> | NOTNode<T>;


//Conversion from a filter AST to a url string (property<operator>value...)
function _produceFilterExtensionFromAST<T extends SchemaObject>(filter: FilterAST<T>): string {

    const booleanOperators = ["AND", "OR", "NOT"] as const;

    //@ts-expect-error generic string indexing on an already variable object AST, since there's a base case AST in the type it can't guarantee a const string property
    const currentOperator: typeof booleanOperators[number] | undefined = booleanOperators.reduce((accumulator, currentItem) => filter[currentItem] != undefined? currentItem : accumulator, undefined);

    console.log(currentOperator);
    switch (currentOperator) {

        case undefined:
            const typedExpression = filter as FilterExpression<T>;
            return encodeURIComponent(typedExpression.field.toString() + typedExpression.operator + typedExpression.filterValue);

        case "NOT":
            //@ts-expect-error technically generic string comparison to restricted string key
            return "!(" + _produceFilterExtensionFromAST(filter["NOT"]) + ")";

        case "AND":
            const typedANDNode = filter as ANDNode<T>;
            return "(" + typedANDNode.AND.map(andOperand => _produceFilterExtensionFromAST(andOperand)).join("&&") + ")";

        case "OR":
            const typedORNode = filter as ORNode<T>;
            return "(" + typedORNode.OR.map(orOperand => _produceFilterExtensionFromAST(orOperand)).join("||") + ")";

        default:
            throw new Error("Unable to parse filter AST for operator: " + currentOperator);
    }
}

//Root-level export to prevent exposing any tree-level checks to an external caller
export function produceFilterExtensionFromAST<T extends SchemaObject>(filter: FilterAST<T>): string {
    let urlString = "?";

    try {
        return urlString + _produceFilterExtensionFromAST(filter);
    }
    catch (e) {
        throw e;
    }
}