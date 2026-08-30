import type { SchemaObject } from "../../../types/SchemaObject";

export function flattenSchemaObject(object: SchemaObject) {
    console.log(object);
    return {
        Id: object.Id,
        ...object.Attributes,
        ...Object.fromEntries(Object.keys(object.Relationships.ManyToOne).map(fkName => [fkName, object.Relationships.ManyToOne[fkName]?.Id])) 
    }
}

export function hasKeyPatternDeep(obj: SchemaObject, regex: RegExp) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    const keys = Object.keys(obj);
    const isMatch = keys.some(key => regex.test(key));
    if (isMatch) return true;

    Object.entries(obj.Relationships.ManyToOne).forEach(([key, value]) => {
        if (regex.test(key)) {
            return true;
        }

        if (typeof value === 'object' && hasKeyPatternDeep(value, regex)) {
            return true;
        }
    });

    Object.entries(obj.Relationships.OneToMany).forEach(([key, valueArr]) => {
        if (regex.test(key)) {
            return true;
        }

        if (((valueArr?.length ?? 0) > 1) && valueArr!.some(value => hasKeyPatternDeep(value, regex))) {
            return true;
        }
    });

    return false;
}

export function hasValuePatternDeep(obj: SchemaObject, regex: RegExp) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    const values = Object.values(obj);
    const isMatch = values.some(value => regex.test(value?.toString() ?? ""));
    if (isMatch) return true;

    Object.entries(obj.Relationships.ManyToOne).forEach(([key, value]) => {
        if (typeof value === 'object' && hasValuePatternDeep(value, regex)) {
            return true;
        }
    });

    Object.entries(obj.Relationships.OneToMany).forEach(([key, valueArr]) => {
        if (((valueArr?.length ?? 0) > 1) && valueArr!.some(value => hasKeyPatternDeep(value, regex))) {
            return true;
        }
    });

    return false;
}