# Category Controller

The Category Controller handles the CRUD operations for categories in the application. It includes endpoints for creating, retrieving, updating, deleting, and changing the status of categories.

## Endpoints

### Get All Categories

**URL:** `/admin/category/getall`  
**Method:** `POST`  
**Description:** Retrieves a paginated list of all categories.  
**Request Body:**
```json
{
  "page": 1,
  "limit": 10
}
```
**Response:**
```json
{
  "message": "Category fetched successfully.",
  "data": [...]
}
```

### Create a New Category

**URL:** `/admin/category`  
**Method:** `POST`  
**Description:** Creates a new category.  
**Request Body:**
```json
{
  "name": "New Category",
  "description": "Category Description"
}
```
**Response:**
```json
{
  "message": "Data saved successfully.",
  "data": {...}
}
```

### Get a Category by ID

**URL:** `/admin/category/:id`  
**Method:** `GET`  
**Description:** Retrieves a category by its ID.  
**Response:**
```json
{
  "message": "Category retrieved successfully.",
  "data": {...}
}
```

### Update a Category

**URL:** `/admin/category/:id`  
**Method:** `PATCH`  
**Description:** Updates an existing category.  
**Request Body:**
```json
{
  "name": "Updated Category",
  "description": "Updated Description"
}
```
**Response:**
```json
{
  "message": "Category updated successfully.",
  "data": {...}
}
```

### Delete a Category

**URL:** `/admin/category/:id`  
**Method:** `DELETE`  
**Description:** Deletes a category by its ID.  
**Response:**
```json
{
  "message": "Category deleted successfully."
}
```

### Update Category Status

**URL:** `/admin/category/status-change/:id`  
**Method:** `PATCH`  
**Description:** Updates the status of a category.  
**Request Body:**
```json
{
  "status": "Active"
}
```
**Response:**
```json
{
  "message": "Status updated successfully.",
  "data": {...}
}
```

## Guards and Authentication

All endpoints are protected by JWT authentication and require a valid token to access. The `AuthGuard` is used to enforce this.

## Pipes

The `MongoIdPipe` is used to validate and transform the `id` parameter in the endpoints.

## Versioning

All endpoints are versioned with `v1`.

## Dependencies

The Category Controller depends on the following modules:
- `CategoryService`
- `AuthGuard`
- `MongoIdPipe`
