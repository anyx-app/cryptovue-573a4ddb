import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartCard } from '@/components/recipes/dashboard/ChartCard';
import { useTheme } from 'next-themes';

const data = [
  { name: 'Bitcoin', value: 45 },
  { name: 'Ethereum', value: 30 },
  { name: 'Solana', value: 15 },
  { name: 'USDT', value: 10 },
];

const COLORS = ['#00FFAB', '#00C9A7', '#009688', '#00695C'];

export function AllocationChart() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ChartCard
      title="Asset Allocation"
      description="Distribution by asset"
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ 
              backgroundColor: isDark ? '#1f2937' : '#fff', 
              borderColor: isDark ? '#374151' : '#e5e7eb',
              borderRadius: '8px'
            }}
            itemStyle={{ color: isDark ? '#fff' : '#000' }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

