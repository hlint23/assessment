# EcoVision: Climate Visualizer

## Overview

EcoVision is a web application designed to visualize and analyze climate data across different locations. The application provides an intuitive interface for exploring temperature, precipitation, and humidity metrics, allowing users to gain insights into climate patterns.

## Project Structure

### Backend (Flask)
- **Framework**: Flask
- **Database**: SQLite with SQLAlchemy ORM
- **Key Features**:
  - RESTful API endpoints for climate data retrieval
  - Flexible filtering of climate metrics
  - Summary statistics generation

### Frontend (React)
- **Framework**: React
- **State Management**: React Hooks
- **Styling**: Tailwind CSS
- **Key Features**:
  - Dynamic data filtering
  - Interactive charts
  - Location and metric selection

## Backend API Endpoints

### 1. Get Climate Data
- **Endpoint**: `/api/v1/climate`
- **Method**: GET
- **Query Parameters**:
  - `location_id` (optional): Filter by specific location
  - `start_date` (optional): Start date for data filtering
  - `end_date` (optional): End date for data filtering
  - `metric` (optional): Specific climate metric (temperature, precipitation, humidity)

**Response Example**:
```json
{
  "data": [
    {
      "id": 1,
      "location_id": 123,
      "location_name": "Irvine",
      "date": "2025-01-15",
      "metric": "temperature",
      "value": 18.5,
      "unit": "celsius"
    }
  ],
  "meta": {
    "total_count": 100,
    "page": 1,
    "per_page": 50
  }
}
```

### 2. Get Locations
- **Endpoint**: `/api/v1/locations`
- **Method**: GET

**Response Example**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Irvine",
      "country": "USA",
      "latitude": 33.6846,
      "longitude": -117.8265,
      "region": "California"
    },
    {
      "id": 2,
      "name": "Tokyo",
      "country": "Japan",
      "latitude": 35.6762,
      "longitude": 139.6503,
      "region": "Kanto"
    },
    {
      "id": 3,
      "name": "London",
      "country": "UK",
      "latitude": 51.5074,
      "longitude": -0.1278,
      "region": "England"
    }
  ]
}
```

### 3. Get Metrics
- **Endpoint**: `/api/v1/metrics`
- **Method**: GET

**Response Example**:
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
    {
      "id": 2,
      "name": "precipitation",
      "display_name": "Precipitation",
      "unit": "mm",
      "description": "Daily precipitation amount"
    },
    {
      "id": 3,
      "name": "humidity",
      "display_name": "Humidity",
      "unit": "percent",
      "description": "Average daily humidity"
    }
  ]
}
```

### 4. Get Climate Summary
- **Endpoint**: `/api/v1/summary`
- **Method**: GET
- **Query Parameters**: Same as Climate Data endpoint

**Response Example**:
```json
{
  "data": {
    "temperature": {
      "min": 18.5,
      "max": 22.6,
      "avg": 20.3,
      "unit": "celsius"
    },
    "precipitation": {
      "min": 0.0,
      "max": 5.2,
      "avg": 2.16,
      "unit": "mm"
    }
  }
}
```

## Frontend Components

### App Component
- Manages global state for locations, metrics, and climate data
- Handles API calls and filter management
- Renders main application layout

### Filters Component
- Provides UI for selecting:
  - Location
  - Start and End Dates
  - Climate Metrics
- Triggers data fetching based on user selections

### ChartContainer Component
- Renders different chart types (line, bar)
- Displays climate data visualizations
- Supports loading states

### Summary Component
- Displays textual and numerical summary of climate data
- Provides quick insights into climate metrics

## Database Schema

### Locations Table
- `id`: Primary key
- `name`: Location name
- `country`: Country
- `latitude`: Geographical latitude
- `longitude`: Geographical longitude
- `region`: Regional information

### Metrics Table
- `id`: Primary key
- `name`: Metric identifier
- `display_name`: Human-readable name
- `unit`: Measurement unit
- `description`: Metric description

### ClimateData Table
- `id`: Primary key
- `location_id`: Foreign key to Locations
- `metric_id`: Foreign key to Metrics
- `date`: Measurement date
- `value`: Numerical value
- `quality`: Data quality indicator

## Setup and Installation

### Backend
1. Clone the repository
2. Create a virtual environment
3. Install dependencies:
   ```bash
   pip install flask flask-cors sqlalchemy
   ```
4. Initialize the database
5. Run the Flask application:
   ```bash
   python app.py
   ```

### Frontend
1. Navigate to the frontend directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used
- Backend: Python, Flask, SQLAlchemy
- Frontend: React, Tailwind CSS
- Database: SQLite
- API: RESTful design

## Future Improvements
- Implement user authentication
- Add more advanced filtering options
- Create more complex data visualizations
- Support for more climate metrics
- Improve error handling and validation
