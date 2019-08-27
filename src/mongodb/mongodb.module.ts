import { Global, Module, DynamicModule } from "@nestjs/common";
import { MongodbOptions } from "./mongodb.interface";
import { createOptionProvider } from "./mongodb.provider";
import { MongodbService } from "./mongodb.service";
import { ScannerModule } from "@quickts/nestjs-scanner";

@Module({})
export class MongodbModule {
    static forRoot(options: MongodbOptions): DynamicModule {
        const optionProvider = createOptionProvider(options);
        return {
            module: MongodbModule,
            imports: [ScannerModule.forRoot(false)],
            providers: [optionProvider, MongodbService],
            exports: [MongodbService]
        };
    }
}

@Global()
@Module({})
export class MongodbGlobalModule {
    static forRoot(options: MongodbOptions): DynamicModule {
        const optionProvider = createOptionProvider(options);
        return {
            module: MongodbGlobalModule,
            imports: [ScannerModule.forRoot(true)],
            providers: [optionProvider, MongodbService],
            exports: [MongodbService]
        };
    }
}
