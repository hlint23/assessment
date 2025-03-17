import { useState } from 'react';

function Filters({ locations, metrics, filters, onFilterChange, onApplyFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
    onApplyFilters();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-eco-primary mb-4">Filter Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-4 items-end">
        <div className="md:col-span-3">
          <label htmlFor="locationId" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            id="locationId"
            name="locationId"
            value={localFilters.locationId}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-eco-primary focus:ring focus:ring-eco-primary focus:ring-opacity-50"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}, {location.country}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <label htmlFor="metric" className="block text-sm font-medium text-gray-700 mb-1">
            Metric
          </label>
          <select
            id="metric"
            name="metric"
            value={localFilters.metric}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-eco-primary focus:ring focus:ring-eco-primary focus:ring-opacity-50"
          >
            <option value="">All Metrics</option>
            {metrics.map((metric) => (
              <option key={metric.id} value={metric.name}>
                {metric.display_name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={localFilters.startDate}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-eco-primary focus:ring focus:ring-eco-primary focus:ring-opacity-50"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={localFilters.endDate}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-eco-primary focus:ring focus:ring-eco-primary focus:ring-opacity-50"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-eco-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-eco-primary focus:ring-opacity-50"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
}

export default Filters;