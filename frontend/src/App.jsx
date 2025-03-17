import { useState, useEffect } from 'react';
import Filters from './components/Filters';
import ChartContainer from './components/ChartContainer';
import Summary from './components/Summary'
import { getLocations, getMetrics, getClimateData, getClimateSummary } from './api';

function App() {
  const [locations, setLocations] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [climateData, setClimateData] = useState([]);
  const [summaryData, setSummaryData] = useState("");
  const [filters, setFilters] = useState({
    locationId: '',
    startDate: '',
    endDate: '',
    metric: ''
  });
  const [loading, setLoading] = useState(false);

  // Fetch locations and metrics on component mount
  useEffect(() => {
    // TODO: Implement API calls to fetch locations and metrics
    // Example:
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    
    const fetchMetrics = async () => {
      try {
        // const response = await fetch('/api/v1/metrics');
        const data = await getMetrics();
        setMetrics(data.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };
    
    fetchLocations();
    fetchMetrics();
  }, []);

  // Fetch climate data when filters change
  const fetchClimateData = async () => {
    // TODO: Implement API call to fetch climate data with filters
    // Example:
    setLoading(true);
    try {
      // const queryParams = new URLSearchParams();
      // if (filters.locationId) queryParams.append('location_id', filters.locationId);
      // if (filters.startDate) queryParams.append('start_date', filters.startDate);
      // if (filters.endDate) queryParams.append('end_date', filters.endDate);
      // if (filters.metric) queryParams.append('metric', filters.metric);
      
      // const response = await fetch(`http://127.0.0.1:5000/api/v1/climate?${queryParams}`);
      // const data = await response.json();

      const data = await getClimateData(filters)
      const summary_res = await getClimateSummary(filters)
      
      setClimateData(data.data);
      setSummaryData(summary_res.data);
    } catch (error) {
      console.error('Error fetching climate data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-eco-primary mb-2">EcoVision: Climate Visualizer</h1>
        <p className="text-gray-600 italic">Transforming climate data into actionable insights for a sustainable future</p>
      </header>

      <Filters 
        locations={locations}
        metrics={metrics}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={fetchClimateData}
      />

      <Summary
        title={"Summary"}
        loading={loading}
        data={summaryData}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ChartContainer 
          title="Temperature Trends"
          loading={loading}
          chartType="line"
          data={climateData}
        />
        <ChartContainer 
          title="Climate Comparison"
          loading={loading}
          chartType="bar"
          data={climateData}
        />
      </div>
    </div>
  );
}

export default App;