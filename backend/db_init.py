import sqlite3
import json
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, Date, Text, and_
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.dialects.sqlite import insert

DATABASE = "data.db"
DATA_FILE_PATH = '../data/sample_data.json'


engine = create_engine('sqlite:///data.db', echo=True)
Base = declarative_base()



def to_dict(data):
    return {c.name: getattr(data, c.name) for c in data.__table__.columns}

class Locations(Base):
    __tablename__ = 'locations'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    region = Column(String(100), nullable=False)

class Metrics(Base):
    __tablename__ = 'metrics'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False, unique=True)
    display_name = Column(String(100), nullable=False)
    unit = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)

class ClimateData(Base):

    __tablename__ = 'climatedata'

    id = Column(Integer, primary_key=True)
    location_id = Column(Integer, nullable=False)  # ForeignKey if Location model exists
    metric_id = Column(Integer, nullable=False)  # ForeignKey if Metric model exists
    date = Column(Date, nullable=False)
    value = Column(Float, nullable=False)
    quality = Column(String(50), nullable=False)



Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

def load_data(file_path):
    with open(file_path) as f:
        data = json.load(f)

    
    locations = data.get('locations')
    metrics = data.get('metrics')
    climate_data = data.get('climate_data')

    # if locations:
    #     for item in locations:
    #         existing_item = session.query(Locations).filter(Locations.id == item.get('id')).first()
    #         if existing_item:
    #             print("already exists~~~", item)
    #             continue

    #         new_location = Locations(
    #             name = item.get('name'),
    #             country = item.get('country'),
    #             latitude = item.get('latitude'),
    #             longitude = item.get('longitude'),
    #             region = item.get('region'),
                
    #         )
    #         session.add(new_location)
        

    # if metrics:
    #     for item in metrics:
    #         new_metric = Metrics(
    #             name = item.get('name'),
    #             display_name = item.get('display_name'),
    #             unit = item.get('unit'),
    #             description = item.get('description'),                
    #         )
    #         print(new_metric)
    #         session.merge(new_metric)


    # if climate_data:
    #     for item in climate_data:

    #         date = datetime.strptime(item.get('date'), "%Y-%m-%d")

    #         new_climate_data = ClimateData(
    #             location_id = item.get('location_id'),
    #             metric_id = item.get('metric_id'),
    #             date = date,
    #             value = item.get('value'),                
    #             quality = item.get('quality'),                
    #         )
    #         print(new_climate_data)
    #         session.merge(new_climate_data)

    session.commit()



if __name__ == '__main__':
    load_data(DATA_FILE_PATH)