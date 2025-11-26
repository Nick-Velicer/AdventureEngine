//This implements utility types and conversions from type to url parameters.
//Since this is a meta-type utility, this is excluded from the app-level synchronization
//and communicates through URL params to try and prevent harder coupling through a custom interface.

import { type SchemaObject } from "../types/SchemaObject";

const filterOperators = [
    "eq",
    "neq",
    "lt",
    "lte",
    "gt",
    "gte",
] as const;

type FilterOperator = typeof filterOperators[number];

type FilterableProperties<T extends SchemaObject> = keyof T["Attributes"] | keyof T["Relationships"]["ManyToOne"]

type FilterExpression<T extends SchemaObject> = {
    field: FilterableProperties<T>,
    operator: FilterOperator,
    filterValue: string
}

export type FilterCollection<T extends SchemaObject> = Array<FilterExpression<T>>

//Root-level export to prevent exposing any tree-level checks to an external caller
export function produceFilterParamsFromExpression<T extends SchemaObject>(filters: FilterCollection<T>): string {
    try {
        return filters.map(filter => "filter[" + filter.field.toString() + "]=[" + filter.operator + "]" + filter.filterValue).join("&")
    }
    catch (e) {
        throw e;
    }
}