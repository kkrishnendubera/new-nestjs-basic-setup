# ApiConfigModule

This module provides global configuration for the API, including database connection, rate limiting, and logging. It leverages the `@nestjs/config`, `@nestjs/mongoose`, and `@nestjs/throttler` packages.

## Description

The `ApiConfigModule` is designed to be a globally available module, ensuring that configuration settings are accessible throughout the application.  It handles the following:

*   **Environment-based Configuration:** Loads environment variables from a `.env` file specific to the current environment (e.g., `.env.development`, `.env.production`).  This allows for different configurations in various deployment stages.
*   **MongoDB Connection:** Establishes a connection to a MongoDB database using Mongoose. The connection URI and database name are retrieved from environment variables.
*   **Rate Limiting:** Implements rate limiting to prevent abuse and protect the API from excessive requests.  It uses the `@nestjs/throttler` module to limit requests.
*   **Global Logger:** Provides a globally available `Logger` instance for consistent logging across the application.

## Installation

This module assumes you have a NestJS project set up. If not, follow the NestJS quick start guide first.

1.  Install the required dependencies:

```bash
npm install @nestjs/config @nestjs/mongoose @nestjs/throttler