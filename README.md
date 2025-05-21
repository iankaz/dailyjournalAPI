# Daily Journal API

A simple REST API for managing daily journal entries.

## Features

- Create, read, update, and delete journal entries
- Data validation for all operations
- Swagger documentation
- Error handling
- MongoDB integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/dailyjournal
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints

- `GET /api/journal` - Get all journal entries
- `GET /api/journal/:id` - Get a specific journal entry
- `POST /api/journal` - Create a new journal entry
- `PUT /api/journal/:id` - Update a journal entry
- `DELETE /api/journal/:id` - Delete a journal entry

## Example Request

```json
POST /api/journal
{
  "title": "My First Entry",
  "content": "Today was a great day!",
  "mood": "happy"
}
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Internal Server Error 