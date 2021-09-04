import { ObjectOfAnything } from "./utility-types";

interface forEachAsyncArgs<A, B> {
    callback(item: A, index?: number, array?: A[])
}
const asyncForEach = async <A = any, B = any>(array: A[], callback: forEachAsyncArgs<A, B>["callback"]): Promise<B[]> => {
    try {
        const allPromises = array.map(async (item: A, index: number, array: A[]) => callback(item, index, array));
        return await Promise.all(allPromises);
    }
    catch (e) {
        throw e;
    }
}

const camelize = (str)=>{
    str = str.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}

const isObject = function (obj) {
    return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function';
};

export const objKeysToCamelCase = async (object: ObjectOfAnything) :Promise<ObjectOfAnything> => {
    const keys = Object.keys(object);
    const result: ObjectOfAnything = {};
    await asyncForEach(keys, async (key) => {
        const head = object[key];
        const camelized = camelize(key);

        if (isObject(head)) {
            result[camelized] = await objKeysToCamelCase(head);
        }
        else {
            result[camelized] = object[key];
        }
    });
    return result;
}