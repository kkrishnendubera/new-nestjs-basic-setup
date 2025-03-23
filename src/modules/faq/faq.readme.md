# FAQ Controller

This controller handles FAQ-related operations such as fetching, creating, updating, deleting, and changing the status of FAQs.

## Endpoints

### Get All FAQs

**POST** `/admin/faq/getall`

- **Description**: Fetches all FAQs with pagination.
- **Guards**: `AuthGuard('jwt')`
- **Bearer Auth**: Required
- **Request Body**: `FaqListingDto`
- **Response**: `ApiResponse`
- **Example Request**:
    ```json
    {
        "page": 1,
        "limit": 10,
        "search": "faq"
    }
    ```
- **Example Response**:
    ```json
    {
        "message": "FAQ data fetched successfully.",
        "data": {
            "faqs": [
                {
                    "_id": "faqId",
                    "question": "FAQ Question",
                    "answer": "FAQ Answer",
                    "isDeleted": false
                }
            ],
            "total": 1,
            "page": 1,
            "limit": 10
        }
    }
    ```

### Save FAQ

**POST** `/admin/faq`

- **Description**: Creates a new FAQ.
- **Guards**: [AuthGuard('jwt')](http://_vscodecontentref_/0)
- **Bearer Auth**: Required
- **Request Body**: [SaveFaqDto](http://_vscodecontentref_/1)
- **Response**: [ApiResponse](http://_vscodecontentref_/2)
- **Example Request**:
    ```json
    {
        "question": "New FAQ Question",
        "answer": "New FAQ Answer"
    }
    ```
- **Example Response**:
    ```json
    {
        "message": "FAQ saved successfully.",
        "data": {
            "_id": "faqId",
            "question": "New FAQ Question",
            "answer": "New FAQ Answer",
            "isDeleted": false
        }
    }
    ```

### Get FAQ

**GET** `/admin/faq/:id`

- **Description**: Retrieves a FAQ by its ID.
- **Guards**: [AuthGuard('jwt')](http://_vscodecontentref_/3)
- **Bearer Auth**: Required
- **Request Param**: [id](http://_vscodecontentref_/4) (MongoDB ObjectId)
- **Response**: [ApiResponse](http://_vscodecontentref_/5)
- **Example Request**:
    ```json
    {
        "id": "faqId"
    }
    ```
- **Example Response**:
    ```json
    {
        "message": "FAQ retrieved successfully.",
        "data": {
            "_id": "faqId",
            "question": "FAQ Question",
            "answer": "FAQ Answer",
            "isDeleted": false
        }
    }
    ```

### Update FAQ

**PATCH** `/admin/faq/:id`

- **Description**: Updates a FAQ by its ID.
- **Guards**: [AuthGuard('jwt')](http://_vscodecontentref_/6)
- **Bearer Auth**: Required
- **Request Param**: [id](http://_vscodecontentref_/7) (MongoDB ObjectId)
- **Request Body**: [UpdateFaqDto](http://_vscodecontentref_/8)
- **Response**: [ApiResponse](http://_vscodecontentref_/9)
- **Example Request**:
    ```json
    {
        "id": "faqId",
        "question": "Updated FAQ Question",
        "answer": "Updated FAQ Answer"
    }
    ```
- **Example Response**:
    ```json
    {
        "message": "FAQ updated successfully.",
        "data": {
            "_id": "faqId",
            "question": "Updated FAQ Question",
            "answer": "Updated FAQ Answer",
            "isDeleted": false
        }
    }
    ```

### Change FAQ Status

**PATCH** `/admin/faq/status-change/:id`

- **Description**: Changes the status of a FAQ by its ID.
- **Guards**: [AuthGuard('jwt')](http://_vscodecontentref_/10)
- **Bearer Auth**: Required
- **Request Param**: [id](http://_vscodecontentref_/11) (MongoDB ObjectId)
- **Request Body**: [StatusFaqDto](http://_vscodecontentref_/12)
- **Response**: [ApiResponse](http://_vscodecontentref_/13)
- **Example Request**:
    ```json
    {
        "id": "faqId",
        "status": "active"
    }
    ```
- **Example Response**:
    ```json
    {
        "message": "FAQ Status updated successfully.",
        "data": {
            "_id": "faqId",
            "question": "FAQ Question",
            "answer": "FAQ Answer",
            "isDeleted": false,
            "status": "active"
        }
    }
    ```

### Delete FAQ

**DELETE** `/admin/faq/:id`

- **Description**: Deletes a FAQ by its ID.
- **Guards**: [AuthGuard('jwt')](http://_vscodecontentref_/14)
- **Bearer Auth**: Required
- **Request Param**: [id](http://_vscodecontentref_/15) (MongoDB ObjectId)
- **Response**: [ApiResponse](http://_vscodecontentref_/16)
- **Example Request**:
    ```json
    {
        "id": "faqId"
    }
    ```
- **Example Response**:
    ```json
    {
        "message": "FAQ deleted successfully."
    }
    ```