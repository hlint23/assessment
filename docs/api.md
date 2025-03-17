# API Specification

This document outlines the API endpoints you should implement for the EcoVision: Climate Visualizer.

## Base URL

All API endpoints are relative to `/api/v1/`.

## Authentication

For this assessment, you don't need to implement authentication.

## Endpoints

### Get Climate Data

```
GET /climate
```

Retrieves climate data based on query parameters.

**Query Parameters:**

- `location_id` (optional): Filter by location ID
- `start_date` (optional): Filter data from this date (format: YYYY-MM-DD)
- `end_date` (optional): Filter data until this date (format: YYYY-MM-DD)
- `metric` (optional): Type of climate data (e.g., temperature, precipitation, humidity)

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "location_id": 123,
      "location_name": "New York",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "date": "2023-01-01",
      "metric": "temperature",
      "value": 3.5,
      "unit": "celsius"
    },
    ...
  ],
  "meta": {
    "total_count": 100,
    "page": 1,
    "per_page": 50
  }
}
```

### Get Locations

```
GET /locations
```

Retrieves all available locations.

**Response:**

```json
{
  "data": [
    {
      "id": 123,
      "name": "New York",
      "country": "USA",
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    ...
  ]
}
```

### Get Metrics

```
GET /metrics
```

Retrieves available climate metrics.

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "temperature",
      "display_name": "Temperature",
      "unit": "celsius",
      "description": "Average daily temperature"
    },
    ...
  ]
}
```

### Get Climate Summary

```
GET /summary
```

Retrieves summary statistics for climate data.

**Query Parameters:**

- `location_id` (optional): Filter by location ID
- `start_date` (optional): Filter data from this date (format: YYYY-MM-DD)
- `end_date` (optional): Filter data until this date (format: YYYY-MM-DD)
- `metric` (optional): Type of climate data (e.g., temperature, precipitation, humidity)

**Response:**

```json
{
  "data": {
    "temperature": {
      "min": -5.2,
      "max": 35.9,
      "avg": 15.7,
      "unit": "celsius"
    },
    "precipitation": {
      "min": 0,
      "max": 120.5,
      "avg": 25.3,
      "unit": "mm"
    },
    ...
  }
}
```

## Implementation Requirements

- Create appropriate database models to support these endpoints
- Implement efficient queries to handle filtering and aggregation
- Ensure proper error handling and validation
- Consider implementing pagination for large datasets