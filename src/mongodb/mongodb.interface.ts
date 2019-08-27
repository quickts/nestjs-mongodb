import { Db, MongoClientOptions, MongoClientCommonOption } from "mongodb";
export interface MongodbOptions {
    uri: string;
    options: MongoClientOptions;
    db?: string;
    commonOptions?: MongoClientCommonOption;
}

export interface OnMongodbInit {
    onMongodbInit(db: Db): any;
}
