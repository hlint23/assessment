# Database Schema

This document outlines the suggested database schema for the EcoVision: Climate Visualizer. You can modify it based on your implementation needs.

## Tables

### locations

Stores information about geographical locations.

| Column    | Type         | Description                   |
|-----------|--------------|-------------------------------|
| id        | INTEGER      | Primary Key                   |
| name      | VARCHAR(100) | Location name                 |
| country   | VARCHAR(100) | Country name                  |
| latitude  | FLOAT        | Latitude coordinate           |
| longitude | FLOAT        | Longitude coordinate          |
| region    | VARCHAR(100) | Optional region/state/province|

### metrics

Stores information about the types of climate metrics available.

| Column       | Type         | Description                   |
|--------------|--------------|-------------------------------|
| id           | INTEGER      | Primary Key                   |
| name         | VARCHAR(50)  | Metric identifier (e.g., temperature) |
| display_name | VARCHAR(100) | Human-readable name           |
| unit         | VARCHAR(20)  | Unit of measurement           |
| description  | TEXT         | Description of the metric     |

### climate_data

Stores the actual climate measurements.

| Column      | Type         | Description                   |
|-------------|--------------|-------------------------------|
| id          | INTEGER      | Primary Key                   |
| location_id | INTEGER      | Foreign Key to locations.id   |
| metric_id   | INTEGER      | Foreign Key to metrics.id     |
| date        | DATE         | Date of measurement           |
| value       | FLOAT        | Measured value                |
| quality     | VARCHAR(10)  | Optional data quality indicator |

## Implementation Notes

- Create appropriate tables according to the schema above
- Consider adding indexes to optimize query performance
- For this assessment, you can use either MySQL (preferred for our stack) or SQLite
- Implement proper foreign key constraints
- Sample data is provided in the `/data/sample_data.json` file
- You need to implement the logic to seed the database with this data