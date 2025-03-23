# Main Application Entry Point (main.ts)

This file (`main.ts`) is the entry point for the NestJS application. It handles application bootstrapping, configuration, middleware setup, and starts the server.

## Description

The `main.ts` file is responsible for initializing the NestJS application. It performs the following key tasks:

*   **Application Creation:** Creates a NestJS application instance using `NestFactory.create`.
*   **Configuration Loading:** Retrieves configuration settings from the `ConfigService`.
*   **Middleware Setup:** Configures global middleware such as CORS, compression, and security headers (Helmet).
*   **Global Setup:** Applies global pipes, interceptors, and filters for request processing.
*   **Static Assets:** Configures serving static files.
*   **API Documentation (Swagger):** Sets up Swagger documentation for API endpoints, conditionally enabled in development environments.
*   **Server Start:** Starts the application server on the specified port.
*   **Logging:** Logs the application's status and URL.

## Usage

This file is automatically executed when the application starts.  You typically don't modify this file unless you need to customize the application bootstrapping process.

## Code Breakdown

1.  **Application Creation:**

    ```typescript
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    ```

    Creates a NestJS application instance using the `AppModule` as the root module.  `NestExpressApplication` is used to access Express-specific functionalities.

2.  **Configuration and Logging:**

    ```typescript
    const configService = app.get(ConfigService);
    const logger = app.get(Logger);
    ```

    Retrieves the `ConfigService` and `Logger` instances for accessing configuration settings and logging messages.

3.  **Middleware:**

    ```typescript
    app.enableCors({ ... });
    app.use(compression());
    app.use(helmet({ ... }));
    ```

    Configures CORS, compression, and Helmet for security and performance enhancements.

4.  **Global Setup:**

    ```typescript
    app.setGlobalPrefix('/api');
    app.enableVersioning();
    app.useGlobalPipes(new ApiValidationPipe());
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new CustomExceptionFilter());
    ```

    Sets a global API prefix, enables versioning, and applies global pipes (validation), interceptors (response modification), and filters (exception handling).

5.  **Static Assets:**

    ```typescript
    app.useStaticAssets(resolve('./public'));
    app.setBaseViewsDir(resolve('./views'));
    ```

    Configures serving static files from the `public` directory and sets the base directory for views.

6.  **Swagger Documentation (Development Only):**

    ```typescript
    if (configService.getOrThrow('NODE_ENV') === 'development') {
      // ... Swagger configuration
      SwaggerModule.setup('apidoc/v1', app, { ...document, paths: { ... } }); // Admin API Docs
      SwaggerModule.setup('apidoc/v1/user', app, { ...document, paths: { ... } }); // User API Docs
    }
    ```

    Conditionally sets up Swagger documentation for API endpoints in development environments.  It sets up two different Swagger instances, one for admin and one for user, filtering the paths to show correct endpoints in each documentation.

7.  **Server Start:**

    ```typescript
    await app.listen(configService.getOrThrow('PORT'), () => {
        logger.debug(`...`);
    });
    ```

    Starts the application server on the port specified in the configuration.

## Environment Variables

This file relies on environment variables for configuration, particularly `PORT`, `NODE_ENV`, and `PROJECT_NAME`.  These should be defined in a `.env` file (or `.env.<NODE_ENV>`) in the root of your project.

## Dependencies

This file uses the following NestJS packages:

*   `@nestjs/core`
*   `@nestjs/platform-express`
*   `@nestjs/config`
*   `@nestjs/swagger`

It also uses third-party packages:

*   `helmet`
*   `compression`