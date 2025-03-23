# AppModule

This is the root module of the application, responsible for importing and orchestrating all other feature modules. It serves as the central point for dependency injection and module composition.

## Description

The `AppModule` acts as the entry point for the application's module structure. It imports and combines various feature modules, enabling them to interact with each other. This modular approach promotes code organization, maintainability, and scalability.  It also imports the `ApiConfigModule` to ensure global configuration is loaded.

## Modules Imported

The `AppModule` imports the following feature modules:

*   **`ApiConfigModule`:** Provides global configuration for the API, including database connection, rate limiting, and logging.  See the `api-config.module.ts` file for details.
*   **`HelpersModule`:** Contains utility classes and functions that can be shared across the application.
*   **`AuthModule`:** Handles user authentication and authorization logic.
*   **`FaqModule`:** Manages frequently asked questions (FAQs).
*   **`FaqRepositoryModule`:** Provides data access functionalities for FAQs.
*   **`RefreshTokenModule`:** Manages refresh tokens for secure authentication.
*   **`RoleModule`:** Handles user roles and permissions.
*   **`UserDeviceRepositoryModule`:** Provides data access functionalities for user devices.
*   **`UserRepositoryModule`:** Provides data access functionalities for users.
*   **`UsersModule`:** Manages user-related functionalities.
*   **`CategoryRepositoryModule`:** Provides data access functionalities for categories.
*   **`CategoryModule`:** Manages categories of content or items.
*   **`CmsModule`:** Manages content management system (CMS) functionalities.
*   **`CmsRepositoryModule`:** Provides data access functionalities for CMS content.
*   **`RoleRepositoryModule`:** Provides data access functionalities for roles.
