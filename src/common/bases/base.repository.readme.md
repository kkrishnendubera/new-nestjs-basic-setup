# Base Repository

This class (`base.repository.ts`) provides a base repository implementation for interacting with a MongoDB database using Mongoose. It offers a set of common CRUD (Create, Read, Update, Delete) operations and other helpful methods.

## Description

The `BaseRepository` class is designed to be extended by other repositories in your application.  It provides a consistent and reusable way to interact with your Mongoose models, reducing code duplication and promoting best practices.

## Features

*   **Generic Type:** Uses a generic type `T` to represent the Mongoose document type, making it reusable for any schema.
*   **Dependency Injection:** Requires a Mongoose `Model` instance to be injected in the constructor.
*   **CRUD Operations:** Implements common CRUD operations: `getAll`, `getByField`, `getById`, `save`, `updateById`, `delete`.
*   **Querying:** Provides methods for querying data: `getAllByField`, `getCountByParam`, `getDistinctDocument`, `getAllByFieldWithProjection`, `getByFieldWithProjection`.
*   **Bulk Operations:** Supports bulk delete and soft delete operations: `bulkDelete`, `bulkDeleteSoft`.
*   **Updating:** Offers methods for updating documents: `updateByField`, `updateAllByParams`.
*   **Upsert:** Provides a `saveOrUpdate` method for creating or updating a document.

## Methods

### `getAll(params: FilterQuery<T>): Promise<T[]>`

Retrieves all documents matching the given filter.

### `getAllByField(params: FilterQuery<T>): Promise<T[]>`

Retrieves all documents matching the given filter. (Alias for `getAll`)

### `getByField(params: FilterQuery<T>): Promise<T>`

Retrieves a single document matching the given filter.

### `getById(id: Types.ObjectId | string): Promise<T>`

Retrieves a document by its ID.

### `getCountByParam(params: FilterQuery<T>): Promise<number>`

Counts the number of documents matching the given filter.

### `save(body: Partial<T>): Promise<T>`

Creates a new document.

### `updateById(data: UpdateQuery<T>, id: string | Types.ObjectId): Promise<T>`

Updates a document by its ID.

### `getDistinctDocument(field: string, params: FilterQuery<T>): Promise<unknown[]>`

Retrieves distinct values for a given field.

### `getAllByFieldWithProjection(params: FilterQuery<T>, projection: ProjectionFields<T>): Promise<T[]>`

Retrieves all documents matching the given filter with specified projection.

### `getByFieldWithProjection(params: FilterQuery<T>, projection: ProjectionFields<T>): Promise<T>`

Retrieves a single document matching the given filter with specified projection.

### `delete(id: string | Types.ObjectId): Promise<T>`

Deletes a document by its ID.

### `bulkDelete(params: FilterQuery<T>): Promise<mongodb.DeleteResult>`

Deletes multiple documents matching the given filter.

### `updateByField(data: UpdateQuery<T>, param: FilterQuery<T>): Promise<mongodb.UpdateResult>`

Updates a document matching the given filter.

### `updateAllByParams(data: UpdateQuery<T>, params: FilterQuery<mongodb.UpdateResult>)`

Updates multiple documents matching the given filter.

### `bulkDeleteSoft(ids: Types.ObjectId[] | string[]): Promise<mongodb.UpdateResult>`

Performs a soft delete on multiple documents by setting the `isDeleted` flag to `true`.

### `saveOrUpdate(data: UpdateQuery<T>, id: string | Types.ObjectId = undefined): Promise<T>`

Creates a new document if the ID is not provided or doesn't exist, otherwise updates the existing document.

## Usage

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema'; // Example schema
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  // Add custom repository methods here if needed
  async findByEmail(email: string): Promise<User | null> {
    return this.getByField({ email });
  }
}