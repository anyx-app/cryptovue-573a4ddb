import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { ChartCard } from '@/components/recipes/dashboard/ChartCard'

// Mock data for allocation
const data = [
  { name: 'Bitcoin', value: 45, color: '#F7931A' },
  { name: 'Ethereum', value: 30, color: '#627EEA' },
  { name: 'Solana', value: 15, color: '#14F195' },
  { name: 'USDC', value: 10, color: '#2775CA' },
]

export function AllocationChart() {
  return (
    <ChartCard
      title="Asset Allocation"
      description="Distribution by value"
      className="h-full"
    >
      <div className="h-[300px] w-full">
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
                <Cell key={`cell-${index}`} fill={entry.color} stroke="hsl(var(--background))" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                color: 'hsl(var(--popover-foreground))',
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [`${value}%`, 'Allocation']}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-sm text-muted-foreground ml-1">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}

