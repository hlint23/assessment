import { useState, useEffect } from 'react';

const Summary = ({ title, loading, data }) => {
    const [summary, setSummary] = useState({})
    const [temperature, setTemperature] = useState({})
    const [precipitation, setPrecipitation] = useState({})
    const [humidity, setHumidity] = useState({})

    useEffect(() => {
        setTemperature({})
        setPrecipitation({})
        setHumidity({})


        if (!data || data.length === 0) return;

        if (data.temperature){
            setTemperature(data.temperature);
        }
        if (data.precipitation){
            setPrecipitation(data.precipitation)
        }
        if (data.humidity){
            setHumidity(data.humidity)
        }
    },[data])

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h2 className="text-xl font-semibold text-eco-primary mb-4">{title}</h2>
            {loading ? 
                (
                    <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Loading data...</p>
                    </div>
                ):
                (   <div className='flex flex-row items-center justify-around h-full'>
                        <div>
                        { precipitation.min ? (
                        <div >
                            <h3>precipitation:</h3>
                            <li>Min: {precipitation.min} {precipitation.unit}</li>
                            <li>Max: {precipitation.max} {precipitation.unit}</li>
                            <li>Avg: {precipitation.avg} {precipitation.unit}</li>
                        </div>):
                         <div>No Precipitation Data</div>
                        }
                        </div>
                        

                        { temperature.min ? 
                        (<div>
                        <h3>Temperature:</h3>
                        <li>Min: {temperature.min} {temperature.unit}</li>
                        <li>Max: {temperature.max} {temperature.unit}</li>
                        <li>Avg: {temperature.avg} {temperature.unit}</li>
                        </div>)
                        :
                        <div>No Temperature Data</div>
                        }

                        { humidity.min ? 
                       ( <div>
                        <h3>humidity:</h3>
                        <li>Min: {humidity.min} {humidity.unit}</li>
                        <li>Max: {humidity.max} {humidity.unit}</li>
                        <li>Avg: {humidity.avg} {humidity.unit}</li>
                        </div>)
                        :
                            <div>No Humidity Data</div>
                        }
                    </div>

                    
                )
            }

        </div>
    )
};


export default Summary



