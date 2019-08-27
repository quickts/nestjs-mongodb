import { Provider } from "@nestjs/common";
import { MongodbOptions } from "./mongodb.interface";
import { MONGODB_OPTIONS } from "./mongodb.constants";

export function createOptionProvider(options: MongodbOptions): Provider<MongodbOptions> {
    return {
        provide: MONGODB_OPTIONS,
        useValue: options
    };
}
