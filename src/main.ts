import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { resolve } from 'path';

import { AppModule } from './app.module';
import { ApiValidationPipe } from './common/pipes/validation.pipe';
import { CustomExceptionFilter } from './common/filters/exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    const logger = app.get(Logger);

    app.enableCors({
        origin: '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        credentials: true,
    });
    app.use(compression());
    app.use(helmet({
        crossOriginResourcePolicy: false
    }));

    // Apply global pipes, interceptors, and filters
    app.setGlobalPrefix('/api');
    app.enableVersioning();
    app.useGlobalPipes(new ApiValidationPipe()); // For validating incoming data
    app.useGlobalInterceptors(new ResponseInterceptor()); // Intercept outgoing responses
    app.useGlobalFilters(new CustomExceptionFilter()); // Handle exceptions

    app.useStaticAssets(resolve('./public'));
    app.setBaseViewsDir(resolve('./views'));

    if (configService.getOrThrow('NODE_ENV') === 'development') {
        const config = new DocumentBuilder()
            .setOpenAPIVersion('3.1.0')
            .addBearerAuth()
            .setTitle('Admin API')
            .setDescription('The Admin API')
            .setVersion('1.0')
            .addTag('Auth')
            .build();

        const document = SwaggerModule.createDocument(app, config);

        // Admin APIDoc URL
        SwaggerModule.setup('apidoc/v1', app, {
            ...document, paths: Object.fromEntries(
                Object.entries(document.paths).filter(([key]) => key.includes('admin') || (key.includes('auth') && !key.includes('register')))
            )
        });
        // User APIDoc URL
        SwaggerModule.setup('apidoc/v1/user', app, {
            ...document, paths: Object.fromEntries(
                Object.entries(document.paths).filter(([key]) => !key.includes('admin') || key.includes('auth'))
            )
        });
    }

    await app.listen(configService.getOrThrow('PORT'), () => {
        logger.debug(`[${configService.get('PROJECT_NAME')} | ${configService.get('NODE_ENV')}] is running: http://127.0.0.1:${configService.get('PORT')}/apidoc/v1`)
        logger.debug(`[${configService.get('PROJECT_NAME')} | ${configService.get('NODE_ENV')}] is running: http://127.0.0.1:${configService.get('PORT')}/apidoc/v1/user`)
    });
}

bootstrap().catch(console.error);