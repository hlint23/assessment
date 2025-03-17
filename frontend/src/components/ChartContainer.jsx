import { useState, useEffect } from 'react';
// You'll need to import Chart.js components
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function ChartContainer({ title, loading, chartType, data }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // TODO: Implement chart data preparation
    // This would transform the API data into the format needed by Chart.js
    // Example for a temperature line chart:
    // 
    const locations = [...new Set(data.map(item => item.location_name))];
    const dates = [...new Set(data.map(item => item.date))].sort();
    
    const datasets = locations.map(location => {
      const locationData = data.filter(item => item.location_name === location);
      return {
        label: location,
        data: dates.map(date => {
          const point = locationData.find(item => item.date === date);
          return point ? point.value : null;
        }),
        borderColor: getRandomColor(),
        backgroundColor: getRandomColor(0.2),
      };
    });
    
    setChartData({
      labels: dates,
      datasets
    });
  }, [data, chartType]);


  function getRandomColor(opacity = 1) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-96">
      <h2 className="text-xl font-semibold text-eco-primary mb-4">{title}</h2>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading data...</p>
        </div>
      ) : !data || data.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No data available. Please apply filters to see visualizations.</p>
        </div>
      ) : (
        <div className="h-5/6">
          {/* TODO: Implement chart rendering based on chartType */}
          {/* Example: */}
          {chartType === 'line' && chartData && (
            <Line 
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: false,
                    text: title,
                  },
                },
              }}
            />
          )}
          
          {chartType === 'bar' && chartData && (
            <Bar 
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: false,
                    text: title,
                  },
                },
              }}
            />
          )}
          
          <p className="text-center mt-10">Chart will render here</p>
          <p className="text-center text-sm text-gray-500">Implement this component with Chart.js or your preferred charting library</p>
        </div>
      )}
    </div>
  );
}

export default ChartContainer;