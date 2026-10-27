
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FeatureChartProps {
  data: number[];
}

export const FeatureChart: React.FC<FeatureChartProps> = ({ data }) => {
  const chartData = data.map((val, idx) => ({
    name: `F${idx}`,
    value: val,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
        <XAxis 
          dataKey="name" 
          hide 
        />
        <YAxis 
          stroke="#475569" 
          fontSize={10} 
          tickLine={false} 
          axisLine={false}
          tickFormatter={(val) => val.toFixed(1)}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
          itemStyle={{ color: '#818cf8' }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#6366f1" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#colorValue)" 
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
