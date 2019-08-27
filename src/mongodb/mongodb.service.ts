import { Injectable, Inject, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ScannerService } from "@quickts/nestjs-scanner";
import { MongoClient, Db } from "mongodb";
import { MongodbOptions } from "./mongodb.interface";
import { MONGODB_OPTIONS, MONGODB_COLLECTION_METADATA } from "./mongodb.constants";

@Injectable()
export class MongodbService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger("MongodbService");
    private mongoClient: MongoClient = null;
    private db: Db = null;
    constructor(
        @Inject(MONGODB_OPTIONS) private readonly options: MongodbOptions, //
        private readonly scannerService: ScannerService
    ) {}

    async onModuleInit() {
        this.mongoClient = await MongoClient.connect(this.options.uri, this.options.options);
        this.mongoClient.on("error", err => {
            this.logger.error(err);
        });

        this.db = this.mongoClient.db(this.options.db, this.options.commonOptions);
        await this.scannerService.scanProviderPropertyMetadates(
            MONGODB_COLLECTION_METADATA,
            async (instance: any, propertyKey: string, data: any) => {
                instance[propertyKey] = this.db.collection(data.name, data.options);
            }
        );

        await this.scannerService.scanProvider(async instance => {
            if (instance["onMongodbInit"]) {
                await instance["onMongodbInit"](this.db);
            }
        });
    }

    async onModuleDestroy() {
        if (this.mongoClient) {
            await this.mongoClient.close();

            this.mongoClient = null;
            this.db = null;
        }
    }

    getMongodbClient() {
        return this.mongoClient;
    }

    getDb() {
        return this.db;
    }
}
