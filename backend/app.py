# app.py - EcoVision: Climate Visualizer API
# This file contains basic Flask setup code to get you started.
# You may opt to use FastAPI or another framework if you prefer.

from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os
import json

from db_init import load_data, session, Locations, Metrics, ClimateData, to_dict, and_

# DATABASE = "data.db"
# DATA_FILE_PATH = '../data/sample_data.json'



app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# SQLite3 Configuration initial
# load_data(DATA_FILE_PATH)


@app.route('/api/v1/test', methods=['GET'])
def test():
    return "test api"

@app.route('/api/v1/climate', methods=['GET'])
def get_climate_data():
    """
    Retrieve climate data with optional filtering.
    Query parameters: location_id, start_date, end_date, metric
    
    Returns climate data in the format specified in the API docs.
    """
    # TODO: Implement this endpoint
    # 1. Get query parameters from request.args
    # 2. Build and execute SQL query with proper JOINs and filtering
    # 3. Format response according to API specification
    
    args = request.args
    location_id = args.get('location_id')
    start_date = args.get('start_date')
    end_date = args.get('end_date')
    metric = args.get('metric')
    print(location_id, start_date, end_date, metric)

    filters = []
    if location_id:
        filters.append(Locations.id == location_id)
    if metric:
        filters.append(Metrics.name == metric)
    if start_date:
        filters.append(ClimateData.date >= start_date)
    if end_date:
        filters.append(ClimateData.date < end_date)
    if start_date and end_date:
        filters.append(ClimateData.date.between(start_date, end_date))
    

    _query = session.query(ClimateData).join(Locations, ClimateData.location_id == Locations.id).join(Metrics, ClimateData.metric_id == Metrics.id)

    if filters:
        _query = _query.filter(and_(*filters))

    climate_datas = _query.all()

    # for c in climate_datas:
    #     print(c.ClimateData.value, c.Locations.name)

    # to_dict(climate_data) for climate_data in climate_datas

    total_count = len(climate_datas)
    climate_datas = climate_datas[:50]

    return jsonify({"data": [to_dict(climate_data) for climate_data in climate_datas], "meta": {"total_count": total_count, "page": 1, "per_page": 50}})

@app.route('/api/v1/locations', methods=['GET'])
def get_locations():
    """
    Retrieve all available locations.
    
    Returns location data in the format specified in the API docs.
    """
    # TODO: Implement this endpoint
    # 1. Query the locations table
    # 2. Format response according to API specification

    locations = session.query(Locations).all()

    return jsonify({"data": [to_dict(location) for location in locations]})

@app.route('/api/v1/metrics', methods=['GET'])
def get_metrics():
    """
    Retrieve all available climate metrics.
    
    Returns metric data in the format specified in the API docs.
    """
    # TODO: Implement this endpoint
    # 1. Query the metrics table
    # 2. Format response according to API specification

    metrics = session.query(Metrics).all()
    
    return jsonify({"data": [to_dict(metric) for metric in metrics]})

@app.route('/api/v1/summary', methods=['GET'])
def get_summary():
    """
    Retrieve summary statistics for climate data.
    Query parameters: location_id, start_date, end_date, metric
    
    Returns min, max, and avg values for each metric in the format specified in the API docs.
    """
    # TODO: Implement this endpoint
    # 1. Get query parameters from request.args
    # 2. Get list of metrics to summarize (filtered by metric parameter if provided)
    # 3. For each metric, calculate min, max, and avg values with proper filtering
    # 4. Format response according to API specification

    args = request.args
    location_id = args.get('location_id')
    start_date = args.get('start_date')
    end_date = args.get('end_date')
    metric = args.get('metric')

    filters = []
    if location_id:
        filters.append(Locations.id == location_id)
    if metric:
        filters.append(Metrics.name == metric)
    if start_date:
        filters.append(ClimateData.date >= start_date)
    if end_date:
        filters.append(ClimateData.date < end_date)
    if start_date and end_date:
        filters.append(ClimateData.date.between(start_date, end_date))
    

    _query = session.query(
        ClimateData.date,
        ClimateData.value,
        ClimateData.quality,
        ClimateData.metric_id,
        ClimateData.location_id,
        Metrics.name.label('metric_name'),
        Metrics.unit,
        Locations.country,
        Locations.region,
        Locations.name.label('location_name')).join(Locations, ClimateData.location_id == Locations.id).join(Metrics, ClimateData.metric_id == Metrics.id)

    if filters:
        _query = _query.filter(and_(*filters))
        print('_query~~~', _query)

    climate_datas = _query.order_by(ClimateData.date).all()

    print(len(climate_datas))
    for d in climate_datas:
        print(d)
    

    min_metric = 0
    avg_metric = 0
    max_metric = 0
    
    city = ""
    country = ""
    region = ""
    msg = ""
    date_range = ""
    unit = ""
    values = []
    temperature_values = []
    precipitation_values = []
    humidity_values = []

    temperature_object = {}
    precipitation_object = {}
    humidity_object = {}

    for c in climate_datas:
        values.append(c.value)
        city = c.location_name
        region = c.region
        country = c.country
        unit = c.unit
        if c.metric_name == 'temperature':
            temperature_values.append(c.value)
            temperature_object['unit'] = c.unit
        elif c.metric_name == 'precipitation':
            precipitation_values.append(c.value)
            precipitation_object['unit'] = c.unit
        else:
            humidity_values.append(c.value)
            humidity_object['unit'] = c.unit
    
    if values:
        max_metric = max(values)
        min_metric = min(values)
        avg_metric = round(sum(values)/len(values), 2)
    
    if start_date and end_date:
        date_range = f"Between {start_date} and {end_date}"
    else:
        start_date = climate_datas[0].date
        end_date = climate_datas[-1].date
        date_range = f"Between {start_date} and {end_date}"

    msg = f"{date_range}, in {city},{region} {country}, heighest {metric} is {max_metric} {unit}, lowest {metric} is {min_metric} {unit} and average is {avg_metric} {unit}."
    data = {}
    if temperature_values:
        temperature_object['min'] = min(temperature_values)
        temperature_object['max'] = max(temperature_values)
        temperature_object['avg'] = round(sum(temperature_values) / len(temperature_values), 2)
        data['temperature'] = temperature_object
    if precipitation_values:
        precipitation_object['min'] = min(precipitation_values)
        precipitation_object['max'] = max(precipitation_values)
        precipitation_object['avg'] = round(sum(precipitation_values) / len(precipitation_values), 2)
        data['precipitation'] = precipitation_object
    if humidity_values:
        humidity_object['min'] = min(humidity_values)
        humidity_object['max'] = max(humidity_values)
        humidity_object['avg'] = round(sum(humidity_values) / len(humidity_values), 2)
        data['humidity'] = humidity_object


    print(data)

    return jsonify({"msg": msg, 'data':data})

if __name__ == '__main__':
    app.run(debug=True)
