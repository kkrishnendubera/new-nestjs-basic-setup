import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.getOrThrow<string>('MONGO_URI'),
                dbName: configService.getOrThrow<string>('DB_DATABASE'),
            }),
            inject: [ConfigService],
        }),
        ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    ],
    providers: [
        Logger
    ],
})
export class ApiConfigModule { }
