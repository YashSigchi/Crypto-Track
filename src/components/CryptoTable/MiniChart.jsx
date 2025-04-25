import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import './MiniChart.css';

const MiniChart = ({ data, trend }) => {
  // Convert raw data to chart format
  const chartData = data.map((value, index) => ({
    value: Number(value) // Ensure values are numbers
  }));
  
  const color = trend === 'positive' ? '#16c784' : '#ea3943';
  
  // Find min and max for proper scaling
  const minValue = Math.min(...chartData.map(item => item.value));
  const maxValue = Math.max(...chartData.map(item => item.value));
  
  // Add a small padding to make the chart more visually appealing
  const yDomain = [
    minValue - (maxValue - minValue) * 0.1,
    maxValue + (maxValue - minValue) * 0.1
  ];
  
  return (
    <div className="mini-chart-container">
      <ResponsiveContainer width="100%" height={40}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`colorGradient-${trend}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          {/* Add YAxis but hide it for proper scaling */}
          <YAxis 
            domain={yDomain}
            hide={true}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            fill={`url(#colorGradient-${trend})`}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false} // Disable animation for better performance
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniChart;