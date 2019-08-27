import { DbCollectionOptions } from "mongodb";
import { MONGODB_COLLECTION_METADATA } from "./mongodb.constants";

export function MongodbCollection(name: string, options?: DbCollectionOptions) {
    return (target: any, propertyKey: string | symbol) => {
        Reflect.set(target, propertyKey, null);
        Reflect.defineMetadata(MONGODB_COLLECTION_METADATA, { name, options }, target, propertyKey);
    };
}
