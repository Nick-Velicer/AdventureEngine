import type { CampaignEntity, Quantifier } from "../../../types/appTypes/appTypes";
import type { SchemaObject } from "../../../types/SchemaObject";
import { hasKeyPatternDeep, hasValuePatternDeep } from "./utils";


//Allows for separation of relevant calculation modules
//while keeping parent metadata for display/text usage.
//Since parent relationships may be nulled out by recursion checks
//this is a consistent way to maintain the parent/child identities.
type IsolatedQuantiferContext = Array<{
    parentObject: SchemaObject,
    childQuantifierRoots: Array<Quantifier>
}>;


//Allows for passing back titled value determinations
//before actually compounding them (mostly for UI context)
export type CalculationResult = Promise<Record<string, number>>;


function getQuantifierRootsForContext(node: SchemaObject): IsolatedQuantiferContext {

    let manyToOneResults: IsolatedQuantiferContext = [];
    let oneToManyResults: IsolatedQuantiferContext = [];

    //We should never actually get down to the quantifier level,
    //all binding should come from iterating through parents until we
    //hit a quantifier relationship.
    if (node.Type === "Quantifier") {
        throw new Error("Cannot initialize parent/child quantifier context when starting at a quantifier node.");
    }

    if (Object.keys(node.Relationships?.ManyToOne)?.length > 0) {
        manyToOneResults = (
            Object.entries(node.Relationships.ManyToOne)
                .filter(([key, value]) => value instanceof Object)
                .map(([key, value]) => 
                    key.includes("__Quantifier") ? 
                        {
                            parentObject: node,
                            childQuantifierRoots: [value!]
                        }
                        : 
                        getQuantifierRootsForContext(value!)
                ).flat()
        );
    }
    
    if (Object.keys(node.Relationships?.OneToMany).length > 0) {
        oneToManyResults = (
            Object.entries(node.Relationships.OneToMany)
                .filter(([key, value]) => value instanceof Object)
                .map(([key, value]) => 
                    key.includes("__Quantifier") ? 
                        {
                            parentObject: node,
                            childQuantifierRoots: value!
                        }
                        : 
                        value!.map(relationshipInstance => getQuantifierRootsForContext(relationshipInstance)).flat()
                ).flat()
        );
    }

    return [...manyToOneResults, ...oneToManyResults];
}

function getRelevantQuantifiersForEntityStat(entity: CampaignEntity, entityStatName: string): IsolatedQuantiferContext {
    const quantifierContexts = getQuantifierRootsForContext(entity);

    //Technically we could do the key check at the top level to prevent multiple passes,
    //but we need the child arrays trimmed instead of having the top-level context
    //returning true and potnetially having dangling quantifier children that don't contain the target.
    const relevantQuantifiers: IsolatedQuantiferContext = (
        quantifierContexts
            .map(contextModule => ({
                parentObject: contextModule.parentObject,
                childQuantifierRoots: contextModule.childQuantifierRoots.filter(quantifierRoot => hasValuePatternDeep(quantifierRoot, entityStatName))
            }))
            .filter(contextModule => contextModule.childQuantifierRoots.length > 0)
    );

    return relevantQuantifiers;

}

export function calculateProficiencyBonus(entity: CampaignEntity): CalculationResult {

    const getProficiencyBaseForLevel = (level: number) => {
        return 2 + Math.floor((level - 1) / 4);
    }

    const proficiencyQuantifierContext = getRelevantQuantifiersForEntityStat(entity, "Proficiency Bonus");

    return Math.sum(entity.Relationships?.OneToMany?.SubClasses__CampaignEntityDomainSubClassInstance?.map(subclassInstance => subclassInstance.Attributes.Level)
}

