import { type SchemaObject } from "../types/SchemaObject";

const filterOperators = [
    "eq",
    "neq",
    "lt",
    "lte",
    "gt",
    "gte",
] as const;

//This implements utility types and conversions from type to url parameters.
//Since this is a meta-type utility, this is excluded from the app-level synchronization
//and communicates through URL params to try and prevent harder coupling through a custom interface.

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

//This will be added to as needed, currently just ensuring that
//we don't "succeed" a service response on a non-2xx status
export async function validateApiResponse(response: Response): Promise<string | undefined> {

    try {
        if (!(response.status?.toString()?.startsWith("2"))) {
            
            const errorText = await response.json();

            if (typeof errorText != "string") {
                throw("Error determining api error string");
            }

            return errorText;
        }
    }
    catch(errors) {
        //Can eventually be a frontend/runtime error?
        //Maybe separate out from the actual intentional throwing
        //as a more meta-error beyond ones handled gracefully
        console.log(errors);
        throw("Error validating service response");
    }
    
}