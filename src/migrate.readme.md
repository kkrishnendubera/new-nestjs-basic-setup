# Database Migration and Seeding Script (migrate.ts)

This script (`migrate.ts`) performs database migrations and seeds initial data, specifically for roles and users. It uses NestJS's `createApplicationContext` to access the application's services and models.

## Description

The `migrate.ts` script is designed to populate the database with essential data, such as default roles and an initial admin user. This is typically done once during the initial setup of the application or when new features require specific database entries.  It leverages Mongoose models to interact with the MongoDB database.

## Functionality

The script performs the following actions:

1.  **Application Context Creation:** Creates a NestJS application context to access modules and services without starting the full HTTP server.

    ```typescript
    const app = await NestFactory.createApplicationContext(AppModule);
    ```

2.  **Model Injection:** Injects the Mongoose models for `Role` and `User` using the `app.get` method.

    ```typescript
    const roleModel = app.get<Model<Role>>('RoleModel');
    const userModel = app.get<Model<User>>('UserModel');
    ```

3.  **Index Creation:** Ensures that necessary indexes exist on the `Role` and `User` collections for efficient queries.

    ```typescript
    await roleModel.syncIndexes();
    await userModel.syncIndexes();
    ```

4.  **Role Seeding:** Checks if any roles exist in the database. If not, it inserts default roles from the `roles.json` file.

    ```typescript
    const existingRoles = await roleModel.countDocuments();
    if (existingRoles === 0) {
        await roleModel.insertMany(RolesData);
        console.log('Default roles inserted');
    }
    ```

5.  **Admin User Seeding:** Checks if an admin user exists. If not, it creates a new admin user using data from the `users.json` file and associates it with the "admin" role.

    ```typescript
    const adminRole = await roleModel.findOne({ role: 'admin' });
    if (adminRole) {
        const existingAdmin = await userModel.findOne({ email: UsersData.email });
        if (!existingAdmin) {
            await userModel.create({ ...UsersData, role: adminRole._id });
            console.log('Default admin user created');
        }
    }
    ```

6.  **Completion and Cleanup:** Logs a completion message and closes the application context.

    ```typescript
    console.log('Migration completed successfully');
    await app.close();
    ```

7.  **Error Handling:** Catches any errors during the migration process and logs them to the console.

    ```typescript
    migrate().catch((err) => {
        console.error('Migration failed:', err);
    });
    ```

## Data Files

The script relies on two JSON files for seeding data:

*   `roles.json`: Contains an array of default role objects.
*   `users.json`: Contains the data for the initial admin user.

These files should be placed in the `assets` directory (or a similar location) and imported into the script.

## Usage

To run the migration script, execute it using Node.js:

```bash
node migrate.ts