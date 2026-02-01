import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartCard } from '@/components/recipes/dashboard/ChartCard';
import { useTheme } from 'next-themes';

const data = [
  { date: 'Jan', value: 4000 },
  { date: 'Feb', value: 3000 },
  { date: 'Mar', value: 2000 },
  { date: 'Apr', value: 2780 },
  { date: 'May', value: 1890 },
  { date: 'Jun', value: 2390 },
  { date: 'Jul', value: 3490 },
  { date: 'Aug', value: 4200 },
  { date: 'Sep', value: 5100 },
  { date: 'Oct', value: 6800 },
  { date: 'Nov', value: 8900 },
  { date: 'Dec', value: 12459 },
];

export function PortfolioChart() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ChartCard
      title="Portfolio Value"
      description="Performance over time"
      value="$12,459.00"
      change={{ value: 12.5, isPositive: true }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00FFAB" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00FFAB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#333' : '#eee'} />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? '#888' : '#666', fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? '#888' : '#666', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#1f2937' : '#fff', 
              borderColor: isDark ? '#374151' : '#e5e7eb',
              borderRadius: '8px'
            }}
            itemStyle={{ color: isDark ? '#fff' : '#000' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#00FFAB" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

