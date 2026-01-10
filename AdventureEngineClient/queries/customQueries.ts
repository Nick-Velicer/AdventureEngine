import type { SchemaObject } from "../types/SchemaObject";
import { getActiveUser } from "../services/custom/AuthenticationService";

//Eventually if there's a clean way to do so we can also inject the services in here,
//but for now the injection is mostly to keep the query dependencies out of here.

export function composeCustomQueryBuilderContext<
   T extends <G extends SchemaObject>(opts: {
      key: string[],
      query: (...args : any[]) => Promise<G | G[]>
   }) => ReturnType<T>,
   U extends <G extends SchemaObject>(opts: {
      mutation: (...args : any[]) => Promise<G>
      onSuccess: (data: G | G[], ...args: any[]) => any
   }) => ReturnType<U>,
   C extends () => ReturnType<C>,
   Q extends (cacheContext: ReturnType<C>, keys: string[]) => any,
>(
   queryHandler: T,
   mutationHandler: U,
   cacheHandler: C,queryInvalidator: Q
) {
    return {
        useGetActiveUserQuery: () => {
         return queryHandler({
            key: ["getActiveUser"],
            query: () => getActiveUser()
         });
      },
    }
}