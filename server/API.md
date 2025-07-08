# Trips API

This ASP.NET Core server provides a REST API for managing Trip data using an in-memory store.

## Endpoints

### GET /api/trips
Returns all trips.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Paris Adventure",
    "locationName": "Paris, France",
    "date": "2024-07-01T00:00:00"
  }
]
```

### GET /api/trips/{id}
Returns a single trip by ID.

**Response (Success):**
```json
{
  "id": 1,
  "name": "Paris Adventure",
  "locationName": "Paris, France",
  "date": "2024-07-01T00:00:00"
}
```

**Response (Not Found):**
```
Trip with ID {id} not found
```

### POST /api/trips
Creates a new trip.

**Request Body:**
```json
{
  "name": "Trip Name",
  "locationName": "Location",
  "date": "2024-01-01T00:00:00"
}
```

**Response:**
```json
{
  "id": 4,
  "name": "Trip Name",
  "locationName": "Location",
  "date": "2024-01-01T00:00:00"
}
```

### PUT /api/trips/{id}
Updates an existing trip.

**Request Body:**
```json
{
  "name": "Updated Trip Name",
  "locationName": "Updated Location",
  "date": "2024-01-01T00:00:00"
}
```

**Response (Success):**
```json
{
  "id": 1,
  "name": "Updated Trip Name",
  "locationName": "Updated Location",
  "date": "2024-01-01T00:00:00"
}
```

**Response (Not Found):**
```
Trip with ID {id} not found
```

## Model Validation

All fields are required:
- `name`: Maximum 100 characters
- `locationName`: Maximum 100 characters
- `date`: Valid DateTime

## Running the Server

```bash
cd server
dotnet run
```

The server will be available at `http://localhost:5223`.

Swagger documentation is available at `http://localhost:5223/swagger` when running in development mode.