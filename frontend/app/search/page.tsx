'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import WorldMap from '@/components/maps/WorldMap';
import PredictionChart from '@/components/charts/PredictionChart';

// Exact location data from initSearch() in app.js
const locations = [
  { name: 'New York', type: 'City', coordinates: [40.7128, -74.0060] as [number, number] },
  { name: 'London', type: 'City', coordinates: [51.5074, -0.1278] as [number, number] },
  { name: 'Tokyo', type: 'City', coordinates: [35.6762, 139.6503] as [number, number] },
  { name: 'India', type: 'Country', coordinates: [20.5937, 78.9629] as [number, number] },
  { name: 'Brazil', type: 'Country', coordinates: [-14.2350, -51.9253] as [number, number] },
  { name: 'Europe', type: 'Continent', coordinates: [54.5260, 15.2551] as [number, number] },
  { name: 'Africa', type: 'Continent', coordinates: [8.7832, 34.5085] as [number, number] },
  { name: 'Amazon Rainforest', type: 'Region', coordinates: [-3.4653, -62.2159] as [number, number] },
  { name: 'Himalayas', type: 'Mountain Range', coordinates: [28.5983, 83.9311] as [number, number] },
];

// Exact environmental data from updateEnvironmentalStats() in app.js
const environmentalData: Record<string, any> = {
  'New York': { forest: '23% of land area', water: '13% of land area', temperature: '12.5°C average', groundwater: '15m below surface', topography: 'Urban with coastal areas', pollution: 'Moderate (AQI: 55)' },
  'London': { forest: '17% of land area', water: '8% of land area', temperature: '11.3°C average', groundwater: '12m below surface', topography: 'Urban with river Thames', pollution: 'Moderate (AQI: 60)' },
  'Tokyo': { forest: '24% of land area', water: '9% of land area', temperature: '15.6°C average', groundwater: '18m below surface', topography: 'Urban with coastal bay', pollution: 'Moderate-High (AQI: 70)' },
  'India': { forest: '24% of land area', water: '4% of land area', temperature: '24.7°C average', groundwater: 'Rapidly depleting', topography: 'Diverse with mountains, plains, and coasts', pollution: 'High (AQI: 120)' },
  'Brazil': { forest: '59% of land area', water: '12% of land area', temperature: '24.9°C average', groundwater: 'Abundant', topography: 'Diverse with rainforests and highlands', pollution: 'Moderate (AQI: 65)' },
  'Europe': { forest: '38% of land area', water: '3% of land area', temperature: '9.2°C average', groundwater: 'Stable with regional variations', topography: 'Diverse with mountains, plains, and coasts', pollution: 'Low-Moderate (AQI: 40)' },
  'Africa': { forest: '23% of land area', water: '1% of land area', temperature: '26.1°C average', groundwater: 'Variable with regional scarcity', topography: 'Diverse with deserts, savannas, and rainforests', pollution: 'Variable (AQI: 75)' },
  'Amazon Rainforest': { forest: '87% of land area', water: '20% of land area', temperature: '27.2°C average', groundwater: 'Abundant', topography: 'Lowland rainforest with river systems', pollution: 'Low (AQI: 20)' },
  'Himalayas': { forest: '35% of land area', water: '2% of land area (plus glaciers)', temperature: '3.7°C average', groundwater: 'Abundant in valleys', topography: 'High mountain range with glaciers', pollution: 'Low (AQI: 30)' },
};

// Exact risk data from updateRiskIndicators() in app.js
const riskData: Record<string, Record<string, number>> = {
  'New York': { deforestation: 40, flood: 70, drought: 30, pollution: 55 },
  'London': { deforestation: 35, flood: 65, drought: 25, pollution: 60 },
  'Tokyo': { deforestation: 30, flood: 80, drought: 20, pollution: 70 },
  'India': { deforestation: 65, flood: 75, drought: 80, pollution: 85 },
  'Brazil': { deforestation: 85, flood: 60, drought: 50, pollution: 45 },
  'Europe': { deforestation: 40, flood: 55, drought: 60, pollution: 40 },
  'Africa': { deforestation: 70, flood: 50, drought: 90, pollution: 55 },
  'Amazon Rainforest': { deforestation: 90, flood: 40, drought: 30, pollution: 20 },
  'Himalayas': { deforestation: 50, flood: 60, drought: 40, pollution: 30 },
};

// From getRiskLabel() in app.js
function getRiskLabel(pct: number): string {
  if (pct < 30) return 'Low';
  if (pct < 60) return 'Medium';
  if (pct < 80) return 'High';
  return 'Critical';
}

function getRiskColor(pct: number): string {
  if (pct < 30) return 'var(--success-color)';
  if (pct < 60) return 'var(--warning-color)';
  if (pct < 80) return 'var(--danger-color)';
  return '#c0392b';
}

function SearchPageInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<typeof locations>([]);
  const [selectedLocation, setSelectedLocation] = useState<(typeof locations)[0] | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Debounce timer (fixes bug #2 from original)
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const handleSearchInput = useCallback((value: string) => {
    setSearchTerm(value);

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      if (value.length >= 2) {
        const matches = locations.filter((l) =>
          l.name.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5);
        setSuggestions(matches);
      } else {
        setSuggestions([]);
      }
    }, 300); // 300ms debounce

    setDebounceTimer(timer);
  }, [debounceTimer]);

  const selectLocation = (loc: (typeof locations)[0]) => {
    setSelectedLocation(loc);
    setSearchTerm(loc.name);
    setSuggestions([]);
    setActiveTab('overview');
  };

  const handleSearchClick = () => {
    if (searchTerm.length >= 2) {
      const match = locations.find((l) => l.name.toLowerCase() === searchTerm.toLowerCase())
        || locations.find((l) => l.name.toLowerCase().includes(searchTerm.toLowerCase()));
      if (match) selectLocation(match);
    }
  };

  // Auto-search from URL param
  useEffect(() => {
    if (initialQuery) {
      handleSearchInput(initialQuery);
      const match = locations.find((l) => l.name.toLowerCase().includes(initialQuery.toLowerCase()));
      if (match) selectLocation(match);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const envData = selectedLocation ? (environmentalData[selectedLocation.name] || {}) : {};
  const risks = selectedLocation ? (riskData[selectedLocation.name] || { deforestation: 50, flood: 50, drought: 50, pollution: 50 }) : null;

  return (
    <>
      <div className="section-header">
        <h1>Search Location</h1>
        <p>Search for a location to view environmental data</p>
      </div>

      {/* Search Box */}
      <div style={{ maxWidth: 600, margin: '0 auto 2rem', position: 'relative' }}>
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="Search for a location..."
            value={searchTerm}
            onChange={(e) => handleSearchInput(e.target.value)}
            style={{
              flex: 1, padding: '1rem', border: '2px solid var(--border-color)',
              borderRadius: '8px 0 0 8px', outline: 'none', fontSize: '1rem',
              fontFamily: 'var(--font-family)', background: 'var(--card-bg)', color: 'var(--text-color)',
            }}
          />
          <button
            onClick={handleSearchClick}
            style={{
              padding: '0 1.5rem', background: 'var(--primary-color)', color: 'white',
              border: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer',
              fontFamily: 'var(--font-family)',
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        {suggestions.length > 0 && (
          <div style={{
            background: 'var(--card-bg)', borderRadius: '8px', boxShadow: 'var(--box-shadow)',
            marginTop: '0.5rem', overflow: 'hidden', position: 'absolute', width: '100%', zIndex: 10,
          }}>
            {suggestions.map((loc) => (
              <div
                key={loc.name}
                onClick={() => selectLocation(loc)}
                style={{
                  padding: '0.8rem 1rem', cursor: 'pointer', borderBottom: '1px solid var(--border-color)',
                  color: 'var(--text-color)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--hover-bg)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {loc.name} ({loc.type})
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Location Results */}
      {selectedLocation && (
        <>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-color)', marginBottom: '0.5rem' }}>
              {selectedLocation.name}
            </h2>
            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <span>Type: {selectedLocation.type}</span>
              <span>Coordinates: {selectedLocation.coordinates[0].toFixed(2)}, {selectedLocation.coordinates[1].toFixed(2)}</span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem', overflowX: 'auto' }}>
            {['overview', 'satellite', 'historical', 'predictions', 'data'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.8rem 1.5rem', background: 'none', border: 'none',
                  borderBottom: activeTab === tab ? '3px solid var(--primary-color)' : '3px solid transparent',
                  color: activeTab === tab ? 'var(--primary-color)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-family)', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="card">
                <h3>Location Map</h3>
                <div style={{ height: 400 }}>
                  <WorldMap
                    id={`location-map-${selectedLocation.name}`}
                    center={selectedLocation.coordinates}
                    zoom={6}
                    markers={[{
                      position: selectedLocation.coordinates,
                      popup: `<b>${selectedLocation.name}</b><br>${selectedLocation.type}`,
                    }]}
                  />
                </div>
              </div>

              <div className="card">
                <h3>Environmental Statistics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  {[
                    { icon: 'fas fa-tree', label: 'Forest Cover', value: envData.forest },
                    { icon: 'fas fa-water', label: 'Water Bodies', value: envData.water },
                    { icon: 'fas fa-thermometer-half', label: 'Temperature', value: envData.temperature },
                    { icon: 'fas fa-arrow-down', label: 'Groundwater', value: envData.groundwater },
                    { icon: 'fas fa-mountain', label: 'Topography', value: envData.topography },
                    { icon: 'fas fa-smog', label: 'Pollution', value: envData.pollution },
                  ].map((stat) => (
                    <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <i className={stat.icon} style={{
                        fontSize: '1.5rem', color: 'var(--primary-color)',
                        background: 'rgba(44, 120, 115, 0.1)',
                        width: 50, height: 50, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}></i>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{stat.label}</h4>
                        <p style={{ fontWeight: 500, color: 'var(--text-color)' }}>{stat.value || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {risks && (
                <div className="card">
                  <h3>Risk Indicators</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {Object.entries(risks).map(([key, val]) => (
                      <div key={key}>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                          {key} Risk
                        </h4>
                        <div style={{ height: 8, background: 'var(--border-color)', borderRadius: 4, overflow: 'hidden', marginBottom: '0.5rem' }}>
                          <div style={{ height: '100%', width: `${val}%`, background: getRiskColor(val), borderRadius: 4 }}></div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{getRiskLabel(val)} ({val}%)</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Satellite Tab */}
          {activeTab === 'satellite' && (
            <div className="card">
              <h3>Satellite View</h3>
              <div style={{ height: 500 }}>
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 'none', borderRadius: 8 }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedLocation.name)}&t=k&z=${selectedLocation.type === 'City' ? 13 : selectedLocation.type === 'Country' ? 5 : 4}&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                  title={`Satellite view of ${selectedLocation.name}`}
                ></iframe>
              </div>
            </div>
          )}

          {/* Historical Tab */}
          {activeTab === 'historical' && (
            <div className="card">
              <h3>Historical Environmental Data</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <PredictionChart
                  id={`forest-history-${selectedLocation.name}`}
                  labels={['2000', '2005', '2010', '2015', '2020']}
                  datasets={[{
                    label: 'Forest Cover (%)',
                    data: [33, 32, 31, 30, 29],
                    borderColor: 'rgba(39, 174, 96, 1)',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                  }]}
                  scales={{ y: { title: { display: true, text: 'Forest Cover (%)' } } }}
                  height="250px"
                />
                <PredictionChart
                  id={`temp-history-${selectedLocation.name}`}
                  labels={['2000', '2005', '2010', '2015', '2020']}
                  datasets={[{
                    label: 'Temperature (°C)',
                    data: [14.1, 14.3, 14.5, 14.7, 14.9],
                    borderColor: 'rgba(231, 76, 60, 1)',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                  }]}
                  scales={{ y: { title: { display: true, text: 'Temperature (°C)' } } }}
                  height="250px"
                />
              </div>
            </div>
          )}

          {/* Predictions Tab */}
          {activeTab === 'predictions' && (
            <div className="card">
              <h3>Environmental Predictions (2020-2050)</h3>
              <PredictionChart
                id={`prediction-${selectedLocation.name}`}
                labels={['2020', '2025', '2030', '2035', '2040', '2045', '2050']}
                datasets={[
                  { label: 'Forest Cover (%)', data: [28, 27, 26, 25, 24, 23, 22], borderColor: 'rgba(39, 174, 96, 1)', backgroundColor: 'rgba(39, 174, 96, 0.1)', yAxisID: 'y' },
                  { label: 'Water Bodies (%)', data: [12, 11.8, 11.6, 11.4, 11.2, 11, 10.8], borderColor: 'rgba(52, 152, 219, 1)', backgroundColor: 'rgba(52, 152, 219, 0.1)', yAxisID: 'y1' },
                  { label: 'Temperature (°C)', data: [14.9, 15.1, 15.3, 15.5, 15.7, 15.9, 16.1], borderColor: 'rgba(231, 76, 60, 1)', backgroundColor: 'rgba(231, 76, 60, 0.1)', yAxisID: 'y1' },
                ]}
                scales={{
                  y: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'Forest Cover (%)' } },
                  y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'Water / Temp' } },
                  x: { title: { display: true, text: 'Year' } },
                }}
                height="400px"
              />
            </div>
          )}

          {/* Data Tab */}
          {activeTab === 'data' && (
            <div className="card">
              <h3>Environmental Data Summary</h3>
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Environmental Indicator</th>
                      <th>2020</th>
                      <th>2050 (Projected)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Forest Cover (%)', '28', '22'],
                      ['Water Bodies (%)', '12', '10.8'],
                      ['Temperature (°C)', '14.9', '16.1'],
                      ['Air Quality Index', '50', '60'],
                    ].map(([indicator, v2020, v2050]) => (
                      <tr key={indicator}>
                        <td>{indicator}</td>
                        <td>{v2020}</td>
                        <td>{v2050}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageInner />
    </Suspense>
  );
}
