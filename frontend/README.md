# EcoVision: Climate Visualizer Frontend

This is the frontend for the EcoVision Climate Visualizer application. It's built with React, Vite, and TailwindCSS.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

This will start the frontend application at http://localhost:3000.

## Project Structure

- `src/App.jsx` - Main application component
- `src/components/` - React components
  - `Filters.jsx` - Filtering UI for the dashboard
  - `ChartContainer.jsx` - Container for chart visualizations
- `src/api.js` - API service for interacting with the backend

## Implementation Notes

This is a starting point for the frontend. You'll need to:

1. Implement the API calls in `src/api.js`
2. Complete the chart visualizations in `ChartContainer.jsx`
3. Connect the filters to the API calls
4. Style and enhance the UI as needed

## Dependencies

- React - UI library
- Vite - Build tool and dev server
- TailwindCSS - Utility-first CSS framework
- Chart.js and react-chartjs-2 - For data visualizations
- Axios - For API requests (optional, fetch API works too)