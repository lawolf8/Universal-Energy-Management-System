import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Power, DollarSign, TrendingDown, X } from 'lucide-react';

// Generate realistic sample data with different scales for different time ranges
const generateTimeRangeData = (timeRange) => {
  const dataPoints = {
    day: 24,
    week: 7,
    month: 30,
    year: 12
  };

  const baseConsumption = {
    day: 50,
    week: 350,
    month: 1500,
    year: 18000
  };

  const points = dataPoints[timeRange];
  const base = baseConsumption[timeRange];
  
  return Array.from({ length: points }, (_, i) => {
    const consumption = base + (Math.random() * base * 0.2) - (base * 0.1);
    const cost = consumption * 0.12;
    return {
      name: timeRange === 'day' ? `${i}:00` : 
            timeRange === 'year' ? `Month ${i + 1}` : 
            `Day ${i + 1}`,
      consumption: Number(consumption.toFixed(2)),
      cost: Number(cost.toFixed(2))
    };
  });
};

// Calculate metrics based on time range
const calculateMetrics = (timeRange) => {
  const baseMetrics = {
    day: { consumption: 50, cost: 6, savings: 15 },
    week: { consumption: 350, cost: 42, savings: 18 },
    month: { consumption: 1500, cost: 180, savings: 22 },
    year: { consumption: 18000, cost: 2160, savings: 25 }
  };

  const variation = 0.1; // 10% random variation
  const metrics = baseMetrics[timeRange];
  
  return {
    consumption: Number((metrics.consumption * (1 + (Math.random() * variation) - variation/2)).toFixed(2)),
    cost: Number((metrics.cost * (1 + (Math.random() * variation) - variation/2)).toFixed(2)),
    savings: Number((metrics.savings * (1 + (Math.random() * variation) - variation/2)).toFixed(1))
  };
};

const TimeRangeSelector = ({ timeRange, setTimeRange }) => (
  <div className="flex space-x-2 mb-4">
    {['day', 'week', 'month', 'year'].map((range) => (
      <button
        key={range}
        onClick={() => setTimeRange(range)}
        className={`px-4 py-2 rounded-lg transition-colors ${
          timeRange === range
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        {range.charAt(0).toUpperCase() + range.slice(1)}
      </button>
    ))}
  </div>
);

const EnergyMetricCard = ({ icon: Icon, title, value, unit, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="flex items-center gap-3 mb-2">
      <Icon className={`w-6 h-6 ${color}`} />
      <h3 className="text-gray-600 font-medium">{title}</h3>
    </div>
    <p className="text-3xl font-bold">
      {typeof value === 'number' ? value.toLocaleString() : value}
      <span className="text-lg ml-1 text-gray-500">{unit}</span>
    </p>
  </div>
);

export const RoomEnergyCard = ({ room }) => {
  const [isOn, setIsOn] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [timeRange, setTimeRange] = useState('day');
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState(calculateMetrics('day'));
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    setData(generateTimeRangeData(timeRange));
    setMetrics(calculateMetrics(timeRange));
  }, [timeRange]);

  const handleOptimize = () => {
    setIsOptimized(!isOptimized);
    // In a real app, you would call your API here to optimize the room
    console.log(`${isOptimized ? 'Disabling' : 'Enabling'} energy optimization for ${room.name}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{room.name}</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-500 hover:text-blue-600"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          <button
            onClick={() => setIsOn(!isOn)}
            className={`px-4 py-2 rounded-lg ${
              isOn 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-red-500 hover:bg-red-600'
            } text-white transition-colors`}
          >
            {isOn ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 space-y-6">
          <div className="flex justify-between items-center">
            <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
            <button
              onClick={handleOptimize}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isOptimized 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {isOptimized ? 'Optimized' : 'Optimize'}
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <EnergyMetricCard
              icon={Power}
              title="Consumption"
              value={metrics.consumption}
              unit="kWh"
              color="text-blue-500"
            />
            <EnergyMetricCard
              icon={DollarSign}
              title="Cost"
              value={metrics.cost}
              unit="USD"
              color="text-green-500"
            />
            <EnergyMetricCard
              icon={TrendingDown}
              title="Savings"
              value={isOptimized ? metrics.savings * 1.2 : metrics.savings}
              unit="%"
              color="text-purple-500"
            />
          </div>

          {isOptimized && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-800 font-medium">Room optimized</p>
                  <p className="text-green-700 text-sm">This room is running in energy-efficient mode, saving approximately {(metrics.savings * 1.2).toFixed(1)}% energy.</p>
                </div>
              </div>
            </div>
          )}

          <div className="h-64">
            <LineChart width={600} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="consumption"
                stroke="#2563eb"
                name="Consumption (kWh)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cost"
                stroke="#16a34a"
                name="Cost ($)"
              />
            </LineChart>
          </div>
        </div>
      )}
    </div>
  );
};

export const HomeEnergyPopup = ({ onClose }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [isOptimized, setIsOptimized] = useState(false);
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState(calculateMetrics('week'));
  
  useEffect(() => {
    setData(generateTimeRangeData(timeRange));
    setMetrics(calculateMetrics(timeRange));
  }, [timeRange]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Home Energy Analytics</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />

          <div className="grid grid-cols-3 gap-4">
            <EnergyMetricCard
              icon={Power}
              title="Total Consumption"
              value={metrics.consumption}
              unit="kWh"
              color="text-blue-500"
            />
            <EnergyMetricCard
              icon={DollarSign}
              title="Total Cost"
              value={metrics.cost}
              unit="USD"
              color="text-green-500"
            />
            <EnergyMetricCard
              icon={TrendingDown}
              title="Potential Savings"
              value={metrics.savings}
              unit="%"
              color="text-purple-500"
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Energy Optimization</h3>
              <button
                onClick={() => setIsOptimized(!isOptimized)}
                className={`px-6 py-2 rounded-lg ${
                  isOptimized 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-gray-500 hover:bg-gray-600'
                } text-white transition-colors`}
              >
                {isOptimized ? 'Optimized' : 'Optimize'}
              </button>
            </div>
            <p className="text-gray-600">
              {isOptimized 
                ? `Your home is currently running in energy-saving mode. Estimated savings: ${metrics.savings}%`
                : 'Enable home-wide energy optimization to reduce consumption.'}
            </p>
          </div>

          <div className="h-80">
            <LineChart width={700} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="consumption"
                stroke="#2563eb"
                name="Consumption (kWh)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cost"
                stroke="#16a34a"
                name="Cost ($)"
              />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default { RoomEnergyCard, HomeEnergyPopup };