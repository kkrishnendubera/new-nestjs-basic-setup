# CMS Controller

This controller handles CMS-related operations such as fetching, updating, and changing the status of CMS entries.

## Endpoints

### Get All CMS Entries

**POST** `/admin/cms/getall`

- **Description**: Fetches all CMS entries with pagination.
- **Guards**: `AuthGuard('jwt')`
- **Bearer Auth**: Required
- **Request Body**: `CmsListingDto`
- **Response**: `ApiResponse`
- **Example Request**:
    ```json
    {
        "page": 1,
        "limit": 10,
        "search": "cms"
    }
    ```
- **Example Response**:
    ```json
    {
        "message": "CMS data fetched successfully.",
        "data": {
            "cmsEntries": [
                {
                    "_id": "cmsId",
                    "title": "CMS Title",
                    "content": "CMS Content",
                    "isDeleted": false
                }
            ],
            "total": 1,
            "page": 1,
            "limit": 10
        }
    }
    ```

### Get CMS Entry

**GET** `/admin/cms/:id`

- **Description**: Retrieves a CMS entry by its ID.
- **Guards**: [AuthGuard('jwt')](http://_vscodecontentref_/0)
- **Bearer Auth**: Required
- **Request Param**: [id](http://_vscodecontentref_/1) (MongoDB ObjectId)
- **Response**: [ApiResponse](http://_vscodecontentref_/2)
- **Example Request**:
    ```json
    {
        "id": "cmsId"
    }
    ```
- **Example Response**:
    ```json
    {
        "message": "CMS retrieved successfully.",
        "data": {
            "_id": "cmsId",
            "title": "CMS Title",
            "content": "CMS Content",
            "isDeleted": false
        }
    }
    ```

### Update CMS Entry

**PATCH** `/admin/cms/:id`

- **Description**: Updates a CMS entry by its ID.
- **Guards**: [AuthGuard('jwt')](http://_vscodecontentref_/3)
- **Bearer Auth**: Required
- **Request Param**: [id](http://_vscodecontentref_/4) (MongoDB ObjectId)
- **Request Body**: [UpdateCmsDto](http://_vscodecontentref_/5)
- **Response**: [ApiResponse](http://_vscodecontentref_/6)
- **Example Request**:
    ```json
    {
        "id": "cmsId",
        "title": "Updated CMS Title",
        "content": "Updated CMS Content"
    }
    ```
- **Example Response**:
    ```json
    {
        "message": "CMS updated successfully.",
        "data": {
            "_id": "cmsId",
            "title": "Updated CMS Title",
            "content": "Updated CMS Content",
            "isDeleted": false
        }
    }
    ```

### Change CMS Status

**PATCH** `/admin/cms/status-change/:id`

- **Description**: Changes the status of a CMS entry by its ID.
- **Guards**: [AuthGuard('jwt')](http://_vscodecontentref_/7)
- **Bearer Auth**: Required
- **Request Param**: [id](http://_vscodecontentref_/8) (MongoDB ObjectId)
- **Request Body**: [StatusCmsDto](http://_vscodecontentref_/9)
- **Response**: [ApiResponse](http://_vscodecontentref_/10)
- **Example Request**:
    ```json
    {
        "id": "cmsId",
        "status": "active"
    }
    ```
- **Example Response**:
    ```json
    {
        "message": "Status updated successfully.",
        "data": {
            "_id": "cmsId",
            "title": "CMS Title",
            "content": "CMS Content",
            "isDeleted": false,
            "status": "active"
        }
    }
    ```